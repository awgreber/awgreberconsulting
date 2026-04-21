/*
Run this SQL in your Supabase SQL editor before using this endpoint:

create table subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  name text,
  source text default 'contact_form',
  created_at timestamptz default now(),
  active boolean default true
);

alter table subscribers enable row level security;

create policy "Service role only"
  on subscribers
  using (auth.role() = 'service_role');
*/

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

type ContactBody = {
  name?: string
  email?: string
  company?: string
  industry?: string
  message?: string
  newsletter?: boolean
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
      })
    }

    const raw = req.body
    const body: ContactBody =
      typeof raw === 'string' ? (JSON.parse(raw) as ContactBody) : (raw as ContactBody)

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const company = String(body.company ?? '').trim()
    const industry = String(body.industry ?? '').trim()
    const message = String(body.message ?? '').trim()
    const newsletter = Boolean(body.newsletter)

    if (!name || !email || !message) {
      return res.status(500).json({
        success: false,
        error: 'Missing required fields',
      })
    }

    const resend = new Resend(apiKey)
    const subject = `New Contact Form Submission — ${name} from ${company || '(no company)'}`
    const newsletterLabel = newsletter ? 'Yes' : 'No'

    const html = `
      <h1>New contact form submission</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || '—')}</p>
      <p><strong>Industry:</strong> ${escapeHtml(industry || '—')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      <p><strong>Newsletter opt-in:</strong> ${escapeHtml(newsletterLabel)}</p>
    `

    const { error: sendError } = await resend.emails.send({
      from: 'noreply@awgreberconsulting.com',
      to: ['andrew@awgreber.com'],
      subject,
      html,
    })

    if (sendError) {
      return res.status(500).json({
        success: false,
        error: sendError.message ?? 'Failed to send email',
      })
    }

    if (newsletter) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      const { error: subError } = await supabase.from('subscribers').upsert(
        {
          email,
          name: name || null,
          source: 'contact_form',
          active: true,
        },
        { onConflict: 'email' },
      )

      if (subError) {
        return res.status(500).json({
          success: false,
          error: subError.message ?? 'Failed to save subscriber',
        })
      }

      // Beehiiv sync. Shared logic with /api/subscribe.ts; consolidate to a helper in a future pass.
      const pubId = process.env.BEEHIIV_PUBLICATION_ID
      const beeKey = process.env.BEEHIIV_API_KEY

      if (!pubId || !beeKey) {
        console.warn('[contact] Beehiiv env not configured; skipping outbound sync')
      } else {
        const beeUrl = `https://api.beehiiv.com/v2/publications/${encodeURIComponent(pubId)}/subscriptions`
        try {
          const beeRes = await fetch(beeUrl, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${beeKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              send_welcome_email: false,
              reactivate_existing: true,
              double_opt_override: 'off',
              utm_source: 'awgreberconsulting.com',
              utm_medium: 'contact_form',
              referring_site: 'https://awgreberconsulting.com',
            }),
          })

          const beeText = await beeRes.text()
          if (beeRes.ok) {
            let subId: string | undefined
            try {
              const parsed = JSON.parse(beeText) as { data?: { id?: string }; id?: string }
              subId = parsed?.data?.id ?? parsed?.id
            } catch {
              console.error('[contact] Beehiiv JSON parse failed')
            }
            if (subId) {
              try {
                const { error: bhUpdateErr } = await supabase
                  .from('subscribers')
                  .update({ beehiiv_synced: true, beehiiv_id: subId })
                  .eq('email', email)
                if (bhUpdateErr) {
                  console.error(
                    '[contact] Supabase beehiiv fields update failed:',
                    bhUpdateErr.message,
                  )
                }
              } catch (e) {
                console.error(
                  '[contact] Supabase beehiiv fields update threw:',
                  e instanceof Error ? e.message : e,
                )
              }
            }
          } else {
            console.error('[contact] Beehiiv non-2xx:', beeRes.status, beeText.slice(0, 500))
          }
        } catch (e) {
          console.error('[contact] Beehiiv request error:', e instanceof Error ? e.message : e)
        }
      }
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return res.status(500).json({ success: false, error: message })
  }
}
