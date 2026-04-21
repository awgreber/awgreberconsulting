import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.18 },
}

const dotGrid = {
  backgroundImage:
    'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
} as const

const inputClass =
  'mt-2 w-full rounded-lg border border-[rgba(148,163,184,0.3)] bg-[#0F1117] px-3 py-2 text-[#F8FAFC] outline-none focus:border-[#3B82F6]'

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div id="top" className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] pt-28 pb-14 sm:pt-36 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={dotGrid}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.h1
            {...fadeUp}
            className="text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl lg:text-6xl"
          >
            Contact
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.04 }}
            className="mt-4 max-w-3xl text-lg text-[#94A3B8] md:text-xl"
          >
            Reach out when you are ready to map the next step.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <motion.div
            {...fadeUp}
            className="space-y-10 lg:col-span-5"
          >
            <div>
              <Kicker>Why reach out</Kicker>
              <p className="mt-3 text-base leading-relaxed text-[#94A3B8]">
                Operators reach out when they know the hours are recoverable but are not sure
                which workflow to start with, what to build, or how the team needs to change. That
                is the conversation worth having.
              </p>
            </div>

            <div>
              <Kicker>What to expect</Kicker>
              <ol className="mt-4 list-none space-y-4 text-[#94A3B8]">
                <li className="text-base">01. Fit call or Discovery Call Plus, your choice</li>
                <li className="text-base">02. Scoped proposal following the call</li>
                <li className="text-base">03. Engagement timeline discussed together</li>
              </ol>
            </div>

            <blockquote className="border-l-4 border-[#3B82F6] pl-5 text-lg font-medium leading-relaxed text-[#F8FAFC]">
              Tell me where your team is losing time and I will show you how to get it back.
            </blockquote>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.18, delay: 0.06 }} className="lg:col-span-7">
            {success ? (
              <div className="rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] p-6 text-center md:p-8">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">Message received</h2>
                <p className="mt-3 text-[#94A3B8]">
                  We&apos;ll be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-[#94A3B8]">
                  Prefer to schedule a call?{' '}
                  <Link href="/book" className="font-medium text-[#3B82F6] hover:underline">
                    Book a fit call or a Discovery Call →
                  </Link>
                </p>
                <form
                ref={formRef}
                className="grid grid-cols-1 gap-4 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] p-6 md:grid-cols-2 md:p-8"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setError(null)
                  setLoading(true)
                  const form = formRef.current
                  if (!form) {
                    setLoading(false)
                    return
                  }
                  const fd = new FormData(form)
                  const newsletter = form.elements.namedItem('newsletter')
                  const newsletterChecked =
                    newsletter instanceof HTMLInputElement && newsletter.checked

                  const payload = {
                    name: String(fd.get('name') ?? '').trim(),
                    email: String(fd.get('email') ?? '').trim(),
                    company: String(fd.get('company') ?? '').trim(),
                    industry: String(fd.get('industry') ?? '').trim(),
                    message: String(fd.get('message') ?? '').trim(),
                    newsletter: newsletterChecked,
                  }

                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })
                    const data = (await response.json()) as {
                      success?: boolean
                      error?: string
                    }

                    if (!response.ok || !data.success) {
                      setError(data.error ?? 'request_failed')
                      return
                    }

                    form.reset()
                    setSuccess(true)
                  } catch {
                    setError('network')
                  } finally {
                    setLoading(false)
                  }
                }}
              >
                <label className="text-sm text-[#94A3B8]">
                  Name
                  <input type="text" name="name" required className={inputClass} />
                </label>
                <label className="text-sm text-[#94A3B8]">
                  Email
                  <input type="email" name="email" required className={inputClass} />
                </label>
                <label className="text-sm text-[#94A3B8]">
                  Company
                  <input type="text" name="company" className={inputClass} />
                </label>
                <label className="text-sm text-[#94A3B8]">
                  Industry
                  <select name="industry" className={inputClass}>
                    <option value="">Select one</option>
                    <option value="Retail">Retail</option>
                    <option value="Trades">Trades</option>
                    <option value="Legal">Legal</option>
                    <option value="Logistics or supply chain">Logistics or supply chain</option>
                    <option value="Professional services">Professional services</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="text-sm text-[#94A3B8] md:col-span-2">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Briefly describe where your team is losing time, the system you're working in, and what you've tried so far."
                    className={inputClass}
                  />
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[#94A3B8] md:col-span-2">
                  <input
                    type="checkbox"
                    name="newsletter"
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded border-[rgba(148,163,184,0.3)] accent-[#3B82F6]"
                  />
                  <span>
                    Keep me updated on AI tools and operations insights.
                    <span className="ml-1 text-[10px] font-medium uppercase tracking-widest text-[#3B82F6]">
                      Newsletter coming soon
                    </span>
                  </span>
                </label>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-[#3B82F6] px-5 py-3 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                  {error ? (
                    <p className="mt-3 text-sm text-red-400">
                      Something went wrong. Please try again or email andrew@awgreber.com
                      directly.
                    </p>
                  ) : null}
                </div>
              </form>
                <Link
                  href="/book"
                  className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/10 md:max-w-xs"
                >
                  Skip form, book a call
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
