import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Kicker } from './Kicker'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.18 },
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'homepage' }),
      })
      let data: { ok?: boolean } = {}
      try {
        data = (await res.json()) as { ok?: boolean }
      } catch {
        setStatus('error')
        return
      }
      if (!res.ok || data.ok !== true) {
        setStatus('error')
        return
      }
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-[#1A1D2E] py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div {...fadeUp}>
          <Kicker>The Operator&apos;s Edge</Kicker>
          <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
            Practical AI for small business operators
          </h2>
          <p className="mt-6 text-left text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Weekly issue covering what&apos;s working, what&apos;s worth buying, what&apos;s hype.
            Written by an operator, not a vendor. Every issue, five minutes, something you can use
            Monday morning.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.p
            {...fadeUp}
            className="mt-8 text-left text-base text-[#F8FAFC]"
          >
            Thanks, you&apos;re in. Check your inbox for the welcome note.
          </motion.p>
        ) : (
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mt-8"
            onSubmit={(e) => void handleSubmit(e)}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-3">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'submitting'}
                className="h-12 w-full flex-1 rounded-md border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] px-4 text-[#F8FAFC] outline-none focus:border-[#3B82F6] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="h-12 w-full shrink-0 rounded-md bg-[#3B82F6] px-6 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 md:w-[140px]"
              >
                {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' ? (
              <p className="mt-3 text-left text-sm text-red-400">
                Something went wrong. Try again or email andrew@awgreber.com directly.
              </p>
            ) : null}
          </motion.form>
        )}

        <p className="mt-6 text-left text-sm text-[#94A3B8]">
          Free. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
