import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

const dotGrid = {
  backgroundImage:
    'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
} as const

const labelClass =
  'text-xs font-semibold uppercase tracking-[0.22em] text-[#3B82F6]'

const whoFor = [
  "You know something needs to change but aren't sure where to start",
  "You're spending too much time on tasks that should be automated",
  "You've heard about AI but don't know what's actually relevant to your business",
  'You want an outside perspective from someone who has run operations at scale',
  'You want a clear plan before committing to a larger engagement',
]

export function AssessmentPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] pt-28 pb-14 sm:pt-36 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={dotGrid}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.p {...fadeUp} className={labelClass}>
            Assessment
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.04 }}
            className="mt-3 text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl"
          >
            Operational Assessment
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 max-w-3xl text-lg leading-relaxed text-[#64748B] md:text-xl"
          >
            Current assessment and discovery options are on the{' '}
            <Link href="/services" className="font-medium text-[#3B82F6] hover:underline">
              services page
            </Link>
            . Use the contact form when you are ready to talk.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-[rgba(148,163,184,0.15)] px-4 py-14 sm:px-6 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp} className="space-y-10">
            <div>
              <p className="flex gap-3 text-[#F8FAFC]">
                <span className="shrink-0 font-mono text-xl font-bold text-[#3B82F6]">1</span>
                <span>
                  <span className="font-semibold text-[#F8FAFC]">Discovery Session</span>
                  <span className="text-[#64748B]"> · 2 hours</span>
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
                On-site or virtual. We walk through your operation, workflows, team structure,
                current tools, and biggest pain points. No agenda, just an honest conversation about
                how your business actually runs.
              </p>
            </div>
            <div>
              <p className="flex gap-3 text-[#F8FAFC]">
                <span className="shrink-0 font-mono text-xl font-bold text-[#3B82F6]">2</span>
                <span className="font-semibold text-[#F8FAFC]">Written AI Opportunity Report</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
                Delivered within 3 business days. Your top 3 AI opportunities ranked by impact and
                ease of implementation, specific tool recommendations, and estimated ROI for each.
                Clear and actionable, not a 40-page deck.
              </p>
            </div>
            <div>
              <p className="flex gap-3 text-[#F8FAFC]">
                <span className="shrink-0 font-mono text-xl font-bold text-[#3B82F6]">3</span>
                <span>
                  <span className="font-semibold text-[#F8FAFC]">Debrief and Planning Session</span>
                  <span className="text-[#64748B]"> · 1 hour</span>
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
                We walk through the report together, answer your questions, and agree on the right
                next steps. You leave with a plan you can act on immediately, with or without AWGC.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp}>
            <h2 className="text-xl font-semibold text-[#F8FAFC]">Who It&apos;s For</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
              {whoFor.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-0.5 shrink-0 text-[#3B82F6]" aria-hidden>
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <motion.blockquote
          {...fadeUp}
          className="border-l-4 border-[#3B82F6] pl-6 text-lg italic leading-relaxed text-[#CBD5E1] md:text-xl"
        >
          &ldquo;Most clients tell us the Assessment alone was worth ten times what they paid, not
          because of what we built, but because of what they finally understood about their own
          operation.&rdquo;
          <footer className="mt-4 text-sm font-normal not-italic text-[#64748B]">
            Andrew Greber, AWGC
          </footer>
        </motion.blockquote>
      </section>

      <section className="border-t border-[rgba(148,163,184,0.15)] px-4 py-14 sm:px-6 sm:py-18">
        <motion.div {...fadeUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/book"
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white hover:opacity-90"
          >
            Book a Discovery Call · $500
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#3B82F6] px-8 text-base font-semibold text-[#3B82F6] hover:bg-[#3B82F6]/10"
          >
            See engagement tiers
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
