import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { AgentVideoWithOverlay } from '../components/AgentVideoWithOverlay'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.18 },
}

const sections = [
  {
    videoSrc: '/Teddy Agent.mp4',
    ariaLabel: 'Teddy tier example video',
    rowReverse: false,
    kicker: 'Tier example: one implementation',
    headline: 'Teddy. First step into AI',
    body: 'Basic chatbot. Handles FAQs, books calls, routes inbound questions. What we build when an operator wants to see AI land in one place before scaling.',
    ctaLabel: 'Learn about the Teddy tier →',
    ctaHref: '/teddy',
  },
  {
    videoSrc: '/Ollie Agent.mp4',
    ariaLabel: 'Ollie tier example video',
    rowReverse: true,
    kicker: 'Tier example: two to three implementations',
    headline: 'Ollie. Connected stack',
    body: 'Mid-level agent across integrated systems. What we build when an operator is ready to connect workflows, not just add one tool.',
    ctaLabel: 'Learn about the Ollie tier →',
    ctaHref: '/ollie',
  },
  {
    videoSrc: '/Baxter Agent.mp4',
    ariaLabel: 'Baxter tier example video',
    rowReverse: false,
    kicker: 'Tier example: four or more implementations',
    headline: 'Baxter. Operational rebuild',
    body: 'Fully agentic, end to end. What we build when AI becomes core to how the operation runs, not a side project.',
    ctaLabel: 'Learn about the Baxter tier →',
    ctaHref: '/baxter',
  },
] as const

export function MeetTheAgents() {
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
            <Kicker>What we build</Kicker>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl lg:text-6xl">
              Three examples of what AI looks like inside a real operation
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#94A3B8] md:text-xl">
              Teddy, Ollie, and Baxter are my dogs. They also demonstrate what we build at three
              engagement scales. Your agents are custom-built to your brand, your operation, and
              your voice. These videos show what is possible, not what you have to take.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {sections.map((s, index) => (
          <section
            key={s.headline}
            className={`py-16 sm:py-20 ${index > 0 ? 'border-t border-[rgba(148,163,184,0.12)]' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.18 }}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${s.rowReverse ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="overflow-hidden rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] p-3">
                  <AgentVideoWithOverlay src={s.videoSrc} ariaLabel={s.ariaLabel} />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <Kicker>{s.kicker}</Kicker>
                <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
                  {s.headline}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">{s.body}</p>
                <Link
                  href={s.ctaHref}
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#3B82F6] hover:underline"
                >
                  {s.ctaLabel}
                </Link>
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      <section className="border-t border-[rgba(148,163,184,0.15)] bg-[#1A1D2E]/50 px-4 py-16 sm:px-6">
        <motion.div
          {...fadeUp}
          className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        >
          <p className="text-lg font-medium text-[#F8FAFC] md:text-xl">
            Your agents will not be dogs. They will be built for your operation.
          </p>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#3B82F6] px-10 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            See the engagement tiers
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
