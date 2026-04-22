import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

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
    <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] bg-[#0F1117] py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div {...fadeUp}>
          <h1 className="text-5xl font-bold tracking-tight text-[#F8FAFC] md:text-6xl lg:text-7xl">
            The Operator&apos;s Edge
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#3B82F6] md:text-xl">
            Practical AI for Small Business Operators
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-semibold leading-snug text-[#F8FAFC] sm:text-xl">
            Stop guessing, start operating.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Every Monday, Wednesday, and Friday, I break down proven strategies, smart buys, and the
            truth behind the latest trends.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mt-10 text-center text-base text-[#F8FAFC]"
          >
            Thanks, you&apos;re in. Check your inbox for the welcome note.
          </motion.p>
        ) : (
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mt-10"
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
              <p className="mt-3 text-center text-sm text-red-400">
                Something went wrong. Try again or email andrew@awgreber.com directly.
              </p>
            ) : null}
          </motion.form>
        )}

        <p className="mt-6 text-center text-sm text-[#94A3B8]">
          Free {'\u00B7'} No spam {'\u00B7'} Unsubscribe anytime
        </p>
        <p className="mt-2 text-center text-xs text-[#94A3B8]">
          By subscribing, you agree to our{' '}
          <a href="/privacy" className="font-medium text-[#F8FAFC] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  )
}
