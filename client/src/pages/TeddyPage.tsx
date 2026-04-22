import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { AgentVideoWithOverlay } from '../components/AgentVideoWithOverlay'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.18 },
}

const CALLOUT =
  'This is one example of what we build at this tier. Your agent is custom-built to your brand, your operation, and your voice.'

export function TeddyPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] pt-28 pb-14 sm:pt-36 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <Kicker>Tier example</Kicker>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Teddy. First step into AI
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#94A3B8] md:text-xl">
              Basic chatbot. Handles FAQs, books calls, routes inbound questions. What we build when
              an operator wants to see AI land in one place before scaling.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <motion.div
          {...fadeUp}
          className="border-l-2 border-[#3B82F6] bg-[#1A1D2E] px-6 py-8 text-base leading-relaxed text-[#94A3B8]"
        >
          {CALLOUT}
        </motion.div>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <motion.div {...fadeUp}>
          <Kicker>Tier scale</Kicker>
          <blockquote className="mt-4 max-w-3xl text-2xl font-medium leading-snug text-[#F8FAFC] md:text-3xl">
            One implementation. The foundation of your AI stack.
          </blockquote>
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <motion.div
          {...fadeUp}
          className="overflow-hidden rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] p-4"
        >
          <AgentVideoWithOverlay src="/Teddy Agent.mp4" ariaLabel="Teddy agent example video" />
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <motion.div {...fadeUp} className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Link
            href="/book"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book a Discovery Call · $500
          </Link>
          <Link
            href="/services"
            className="inline-flex flex-1 items-center justify-center text-sm font-semibold text-[#3B82F6] hover:underline"
          >
            See all engagement tiers →
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
