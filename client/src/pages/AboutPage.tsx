import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.18 },
}

const dotGrid = {
  backgroundImage:
    'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
} as const

const credentialGroups = [
  {
    heading: 'Education',
    items: [
      {
        abbr: 'MBA',
        title: 'Master of Business Administration',
        sub: undefined as string | undefined,
      },
      {
        abbr: 'BSBM',
        title: 'Bachelor of Science in Business Management',
        sub: undefined,
      },
    ],
  },
  {
    heading: 'AI credentials',
    items: [
      {
        abbr: 'Oxford AI Programme',
        title: 'Saïd Business School, University of Oxford',
        sub: 'Four certificates: AI Essentials, AI Governance, Generative and Agentic AI, AI Foundations for Business Professionals',
      },
      {
        abbr: 'AIGP',
        title: 'AI Governance Professional, IAPP',
        sub: 'In progress',
      },
      {
        abbr: 'Vanderbilt AI',
        title: 'Vanderbilt University',
        sub: 'Three certificates: Prompt Engineering for ChatGPT, Agentic AI and AI Agents for Leaders, Generative AI and AI Agent Organizational Strategy for Leaders',
      },
    ],
  },
  {
    heading: 'Professional membership',
    items: [
      {
        abbr: 'ASCM Professional Member',
        title: 'Association for Supply Chain Management',
        sub: undefined as string | undefined,
      },
    ],
  },
] as const

const traits = [
  {
    title: 'Relator',
    body: 'Deep, trusted working relationships. Not small talk. The kind that hold when a system breaks at 7am on a Saturday.',
  },
  {
    title: 'Arranger',
    body: 'Many moving pieces, at once. Operators recognize this one on sight.',
  },
  {
    title: 'Responsibility',
    body: 'What I commit to, I deliver. Table stakes in operations, and the foundation for everything else.',
  },
  {
    title: 'Learner',
    body: 'Still studying, still certifying. Formal training does not end the learning. It accelerates it.',
  },
  {
    title: 'Strategic',
    body: 'Pattern recognition across what has and has not worked, applied forward. It is why I can see the second-order effects of an AI deployment before they hit.',
  },
] as const

function HeadshotSlot() {
  const [showPhoto, setShowPhoto] = useState(true)
  const frame =
    'mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl border border-[rgba(59,130,246,0.45)] bg-[#0F1117]'

  if (!showPhoto) {
    return <div className={`${frame} h-80`} aria-hidden />
  }

  return (
    <img
      src="/Andrew.PNG"
      alt=""
      className={`${frame} h-auto object-cover`}
      onError={() => setShowPhoto(false)}
    />
  )
}

function CredentialsStack() {
  return (
    <div className="space-y-3">
      {credentialGroups.map((group, i) => (
        <motion.div
          key={group.heading}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.18, delay: i * 0.02 }}
          className="rounded-xl border border-white/10 bg-[#1A1D2E] p-4"
        >
          <p className="text-xs font-medium text-[#94A3B8]">{group.heading}</p>
          <div className="mt-3 divide-y divide-white/10">
            {group.items.map((c) => (
              <div key={c.abbr} className="py-3 first:pt-0 last:pb-0">
                <p className="text-base font-semibold text-[#3B82F6]">{c.abbr}</p>
                <p className="mt-1 text-sm text-[#94A3B8]">{c.title}</p>
                {c.sub ? <p className="mt-2 text-xs leading-relaxed text-[#64748B]">{c.sub}</p> : null}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 opacity-20" style={dotGrid} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14">
            <div className="min-w-0">
              <div className="lg:hidden">
                <motion.div {...fadeUp}>
                  <HeadshotSlot />
                </motion.div>
              </div>

              {/* Section 1: Hero copy */}
              <motion.div {...fadeUp} className="mt-10 lg:mt-0">
                <Kicker>About</Kicker>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-4xl lg:text-5xl">
                  Commercial operations executive
                </h1>
                <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-[#94A3B8] md:text-xl">
                  <p>
                    Twenty-six years in retail operations, most recently Senior Director of Stores at
                    Target. Multi-region, multi-format, at scale.
                  </p>
                  <p>
                    A.W. Greber Consulting is here to help operators adopt AI and optimize recovered
                    hours.
                  </p>
                  <p>
                    We assemble the right tools to meet your needs. Deploy one, two, or stack several.
                  </p>
                </div>
              </motion.div>

              {/* Mobile-only credentials stack between Section 1 and 2 */}
              <div className="mt-12 lg:hidden">
                <motion.div {...fadeUp}>
                  <Kicker>Credentials</Kicker>
                </motion.div>
                <div className="mt-4">
                  <CredentialsStack />
                </div>
              </div>

              {/* Section 2 */}
              <motion.div {...fadeUp} className="mt-14">
                <Kicker>The operator lens</Kicker>
                <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
                  Operations leadership and AI integration
                </h2>
                <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                  <p>
                    Commercial operations leadership and AI integration are usually individual
                    propositions. Operators hire one firm for organizational strategy and another for
                    technology implementation.
                  </p>
                  <p>
                    A.W. Greber Consulting combines both, drawing on twenty-six years of multi-region
                    operations leadership and formal AI certifications.
                  </p>
                  <p>
                    You get both capabilities in a single engagement, with a single point of accountability.
                  </p>
                </div>
              </motion.div>

              {/* Section 3 */}
              <motion.div {...fadeUp} className="mt-14">
                <Kicker>The work</Kicker>
                <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
                  AI implementation paired with organizational design
                </h2>
                <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                  <p>
                    Every engagement pairs an AI build with an organizational review. We identify which
                    tasks go away, which roles evolve, and how your team redeploys recovered hours toward
                    growth.
                  </p>
                  <p>
                    The tools are half the work. Making sure your organization is built to use them is the
                    other half.
                  </p>
                </div>
                <Link
                  href="/services"
                  className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#3B82F6] hover:underline"
                >
                  See the engagement tiers →
                </Link>
              </motion.div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <motion.div {...fadeUp}>
                <HeadshotSlot />
              </motion.div>
              <div className="mt-6">
                <motion.div {...fadeUp}>
                  <Kicker>Credentials</Kicker>
                </motion.div>
                <div className="mt-4">
                  <CredentialsStack />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Section 5: How I operate */}
      <section className="border-t border-[rgba(148,163,184,0.1)] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp}>
            <Kicker>How I operate</Kicker>
            <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
              Five traits that shape the work
            </h2>
          </motion.div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {traits.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.18, delay: i * 0.04 }}
                className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#1A1D2E] p-6 pl-5 shadow-[inset_2px_0_0_0_#3B82F6]"
              >
                <span
                  className="pointer-events-none absolute right-3 top-2 text-[4rem] font-light leading-none text-white/[0.1]"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="relative text-base font-semibold text-[#F8FAFC]">{t.title}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-[#94A3B8]">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="border-t border-[rgba(148,163,184,0.15)] bg-[#1A1D2E] px-4 py-16 sm:px-6 sm:py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Kicker>Next step</Kicker>
          <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
            Start where it makes sense
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Not every operator is ready for a full assessment. The Discovery Call Plus is a
            structured ninety-minute working session for anyone who wants direction before they
            commit.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 sm:w-auto"
            >
              Book a Discovery Call → $500
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[#3B82F6] px-8 text-base font-semibold text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/10 sm:w-auto"
            >
              See the full tier menu
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
