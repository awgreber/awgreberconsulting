/*
  Mirrors client/api/contact.ts: Vercel handler, Supabase service client, upsert on subscribers.

  contact.ts documents subscribers as:
  id, email (unique), name, source, created_at, active

  Optional columns for this endpoint (add in Supabase if missing):
  - industry text
  - newsletter boolean
  - beehiiv_synced boolean
  - beehiiv_id text
*/

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

type SubscribeBody = {
  email?: string
  source?: string
  industry?: string | null
}

const ALLOWED_SOURCES = new Set([
  'homepage',
  'contact_form',
  'teddy_page',
  'footer',
  'directory',
])

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function emailForLog(email: string): string {
  const at = email.indexOf('@')
  if (at < 1) return '***'
  const domain = email.slice(at + 1)
  return `${email.slice(0, Math.min(3, at))}...@${domain}`
}

function normalizeSource(raw: unknown): string {
  const s = typeof raw === 'string' ? raw.trim() : ''
  if (s && ALLOWED_SOURCES.has(s)) return s
  return 'homepage'
}

async function tryUpdateSubscriber(
  supabase: ReturnType<typeof createClient>,
  email: string,
  patch: Record<string, unknown>,
  label: string,
): Promise<void> {
  const { error } = await supabase.from('subscribers').update(patch).eq('email', email)
  if (error) {
    console.error(`[subscribe] ${label} update failed for ${emailForLog(email)}:`, error.message)
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[subscribe] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
      return res.status(500).json({
        ok: false,
        error: 'Subscription service temporarily unavailable',
      })
    }

    const raw = req.body
    const body: SubscribeBody =
      typeof raw === 'string' ? (JSON.parse(raw) as SubscribeBody) : (raw as SubscribeBody)

    const emailRaw = String(body.email ?? '').trim()
    if (!emailRaw) {
      return res.status(400).json({ ok: false, error: 'Email is required' })
    }
    if (!EMAIL_RE.test(emailRaw)) {
      return res.status(400).json({ ok: false, error: 'Invalid email format' })
    }

    const source = normalizeSource(body.source)
    const industry =
      body.industry === null || body.industry === undefined
        ? null
        : String(body.industry).trim() || null

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error: upsertError } = await supabase.from('subscribers').upsert(
      {
        email: emailRaw,
        name: null,
        source,
        active: true,
      },
      { onConflict: 'email' },
    )

    if (upsertError) {
      console.error('[subscribe] Supabase upsert failed:', upsertError.message)
      return res.status(500).json({
        ok: false,
        error: 'Subscription service temporarily unavailable',
      })
    }

    await tryUpdateSubscriber(supabase, emailRaw, { newsletter: true }, 'newsletter')

    if (industry !== null) {
      await tryUpdateSubscriber(supabase, emailRaw, { industry }, 'industry')
    }

    const pubId = process.env.BEEHIIV_PUBLICATION_ID
    const beeKey = process.env.BEEHIIV_API_KEY

    if (!pubId || !beeKey) {
      console.warn('[subscribe] Beehiiv env not configured; skipping outbound sync')
    } else {
      const beeUrl = `https://api.beehiiv.com/v2/publications/${encodeURIComponent(pubId)}/subscriptions`
      let beeRes: Response
      try {
        beeRes = await fetch(beeUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${beeKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailRaw,
            send_welcome_email: false,
            reactivate_existing: true,
            double_opt_override: 'off',
            utm_source: 'awgreberconsulting.com',
            utm_medium: source,
            referring_site: 'https://awgreberconsulting.com',
          }),
        })
      } catch (e) {
        console.error('[subscribe] Beehiiv request error:', e instanceof Error ? e.message : e)
        return res.status(200).json({ ok: true, message: 'Subscribed successfully' })
      }

      const beeText = await beeRes.text()
      if (beeRes.ok) {
        let subId: string | undefined
        try {
          const parsed = JSON.parse(beeText) as { data?: { id?: string }; id?: string }
          subId = parsed?.data?.id ?? parsed?.id
        } catch {
          console.error('[subscribe] Beehiiv JSON parse failed for', emailForLog(emailRaw))
        }
        if (subId) {
          await tryUpdateSubscriber(
            supabase,
            emailRaw,
            { beehiiv_synced: true, beehiiv_id: subId },
            'beehiiv',
          )
        }
      } else {
        console.error(
          '[subscribe] Beehiiv non-2xx:',
          beeRes.status,
          beeText.slice(0, 500),
        )
      }
    }

    return res.status(200).json({ ok: true, message: 'Subscribed successfully' })
  } catch (err) {
    console.error('[subscribe] Unhandled:', err instanceof Error ? err.message : err)
    return res.status(500).json({
      ok: false,
      error: 'Subscription service temporarily unavailable',
    })
  }
}
