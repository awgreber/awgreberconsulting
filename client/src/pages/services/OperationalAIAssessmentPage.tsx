import { motion } from 'framer-motion'
import { Link } from 'wouter'
import {
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Layers,
  MessageSquare,
  Users,
} from 'lucide-react'
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
  'Leadership interviews to understand strategy and priorities',
  'Frontline interviews to find where work actually breaks',
  'Full process mapping of your core operational workflows',
  'Systems inventory: what you use, what talks to what, what is duplicated',
  'Data audit: what you capture, what is usable, what is missing',
  'Written deliverable: comprehensive operational assessment with AI integration roadmap',
  'Build priorities with sequencing and estimated ROI per initiative',
  'Formal proposal for a Baxter build if one is warranted',
] as const

const whoFor = [
  'Operators considering a Baxter-tier build',
  'Businesses between $5M and $25M where the stakes justify the rigor',
  'Owners who want to invest in AI without betting wrong',
  'Leaders who have tried piecemeal AI tools and want a coherent operational plan',
] as const

const howSteps = [
  {
    title: 'Interviews and initial systems inventory',
    text: 'Leadership and frontline context captured alongside a systems baseline.',
    Icon: MessageSquare,
  },
  {
    title: 'Process mapping and data audit',
    text: 'Core workflows mapped end-to-end with a practical view of data quality.',
    Icon: Layers,
  },
  {
    title: 'Synthesis and roadmap drafting',
    text: 'Assessment, sequencing, ROI framing, and build options consolidated into one narrative.',
    Icon: FileSearch,
  },
  {
    title: 'Review, refinement, and delivery',
    text: 'Walkthrough, refinements, and a clear decision path on what to build next.',
    Icon: ClipboardList,
  },
] as const

export function OperationalAIAssessmentPage() {
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
            Operational AI Assessment
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 max-w-3xl text-lg text-[#CBD5E1] md:text-xl"
          >
            Structured engagement. A full operational deep-dive and AI integration roadmap. The
            prerequisite to a Baxter build.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mx-auto mt-10 max-w-xl rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-secondary)] p-8 text-center"
          >
            <p className="text-3xl font-bold text-[var(--accent-primary)]">Contact for Pricing</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Scoped engagement</p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">Phased, following the discovery call</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[var(--accent-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:opacity-90 sm:w-auto"
            >
              Book a Scoping Call
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
                transition={{ duration: 0.45, delay: index * 0.04 }}
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
          Who the Assessment is for
        </motion.h2>
        <ul className="mt-10 space-y-4">
          {whoFor.map((item, index) => (
            <motion.li
              key={item}
              {...fadeUp}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex gap-3 rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-secondary)] p-5 sm:p-6"
            >
              <Users
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
            How the Assessment works
          </motion.h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {howSteps.map(({ title, text, Icon }, index) => (
              <motion.article
                key={title}
                {...fadeUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-xl border border-[rgba(148,163,184,0.2)] bg-[var(--bg-primary)] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(59,130,246,0.15)] text-[#3B82F6]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#F8FAFC]">{title}</h3>
                <p className="mt-2 text-[var(--text-secondary)]">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-18">
        <motion.div
          {...fadeUp}
          className="rounded-xl border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.08)] px-6 py-12 text-center sm:py-14"
        >
          <h2 className="text-2xl font-semibold text-[#F8FAFC] sm:text-3xl">
            If a Baxter build is on the table, the Assessment is how you de-risk it.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--accent-primary)] px-8 text-base font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Book a Scoping Call
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
