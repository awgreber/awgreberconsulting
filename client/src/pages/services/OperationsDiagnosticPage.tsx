import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Calendar, CheckCircle2, FileText, Phone, Search } from 'lucide-react'
import { Footer } from '../../components/Footer'
import { Navbar } from '../../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5 },
}

const labelClass =
  'text-xs font-semibold uppercase tracking-[0.22em] text-[#3B82F6]'

const whatYouGet = [
  '2-3 hour discovery call with me, not a junior associate',
  'Full review of your current systems, workflows, and pain points',
  'Written deliverable: 5 to 10 specific automation opportunities, each ranked by ROI and effort',
  'One follow-up call to walk through the findings and answer questions',
  'A clear next step, whether that is a build with me, a tool recommendation, or doing nothing',
] as const

const whoFor = [
  'Operators who know AI is part of the conversation but do not know where to start',
  'Businesses between $1M and $15M in revenue',
  'Leaders who want to see what is possible before committing to a build',
  'Operators who are tired of generic AI advice and want specifics tied to their business',
] as const

const whatYouDoNotGet = [
  'A sales pitch',
  'Generic AI trend slides',
  'Recommendations to buy tools you do not need',
  'Vague language about transformation or synergies',
] as const

const howSteps = [
  {
    title: 'Discovery call',
    text: 'We align on goals, constraints, and where the operation feels friction first.',
    Icon: Phone,
  },
  {
    title: 'Analysis and findings drafting',
    text: 'Systems and workflows reviewed against practical automation opportunities.',
    Icon: Search,
  },
  {
    title: 'Review and refinement',
    text: 'Findings tightened so recommendations are specific and sequenced.',
    Icon: FileText,
  },
  {
    title: 'Written deliverable and follow-up call',
    text: 'You leave with a roadmap and a clear decision on what to do next.',
    Icon: Calendar,
  },
] as const

export function OperationsDiagnosticPage() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)]">
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
          <motion.p {...fadeUp} className={labelClass}>
            ASSESSMENT
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl lg:text-6xl"
          >
            Operations Diagnostic
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 max-w-3xl text-lg text-[#CBD5E1] md:text-xl"
          >
            Structured engagement. Your full operation reviewed. A written roadmap of what to
            automate, in what order, and why.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mx-auto mt-10 max-w-xl rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-secondary)] p-8 text-center"
          >
            <p className="text-3xl font-bold text-[var(--accent-primary)]">$3,500</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Flat fee</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Structured engagement</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--accent-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:opacity-90 sm:w-auto"
            >
              Book the Diagnostic
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[rgba(148,163,184,0.15)] bg-[var(--bg-secondary)]/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#F8FAFC] md:text-4xl"
          >
            What you get
          </motion.h2>
          <ul className="mt-10 space-y-4">
            {whatYouGet.map((item, index) => (
              <motion.li
                key={item}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-primary)] p-5 sm:p-6"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#3B82F6]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {item}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <motion.h2
          {...fadeUp}
          className="text-3xl font-semibold text-[#F8FAFC] md:text-4xl"
        >
          Who the Diagnostic is for
        </motion.h2>
        <ul className="mt-10 space-y-4">
          {whoFor.map((item, index) => (
            <motion.li
              key={item}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-secondary)] p-5 sm:p-6"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[#3B82F6]"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="border-y border-[rgba(148,163,184,0.15)] bg-[var(--bg-secondary)]/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
          <motion.h2
            {...fadeUp}
            className="text-3xl font-semibold text-[#F8FAFC] md:text-4xl"
          >
            What you do not get
          </motion.h2>
          <ul className="mt-10 space-y-4">
            {whatYouDoNotGet.map((item, index) => (
              <motion.li
                key={item}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex gap-3 rounded-xl border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.06)] p-5 sm:p-6"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  {item}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <motion.h2
          {...fadeUp}
          className="text-3xl font-semibold text-[#F8FAFC] md:text-4xl"
        >
          How the Diagnostic works
        </motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {howSteps.map(({ title, text, Icon }, index) => (
            <motion.article
              key={title}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-secondary)] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(59,130,246,0.15)] text-[#3B82F6]">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-2 text-[var(--text-secondary)]">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-18">
        <motion.div
          {...fadeUp}
          className="rounded-xl border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.08)] px-6 py-12 text-center sm:py-14"
        >
          <h2 className="text-2xl font-semibold text-[#F8FAFC] sm:text-3xl">
            The Diagnostic is the fastest way to know whether AI belongs in your operation and what to
            do first.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Book the Diagnostic
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
