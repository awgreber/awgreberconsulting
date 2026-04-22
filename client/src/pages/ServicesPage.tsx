import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'
import { ServiceCard } from '../components/ServiceCard'
import { engagementTiers } from '../data/services'

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

function DiscoveryDeliverableBlock() {
  return (
    <div className="mt-5 border-l-2 border-[#3B82F6] pl-4">
      <p className="text-sm font-medium text-[#F8FAFC]">You walk away with:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#94A3B8]">
        <li>A one-page AI roadmap scoped to your operation</li>
        <li>A prioritized list of workflows where AI recovers hours</li>
        <li>A clear recommendation on which engagement tier fits</li>
      </ul>
    </div>
  )
}

export function ServicesPage() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] pt-28 pb-14 sm:pt-36 sm:pb-18">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={dotGrid}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <Kicker>Services</Kicker>
            <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl lg:text-6xl">
              Recovered hours, redeployed
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#94A3B8] md:text-xl">
              Engagements scale by how many AI implementations fit in your operation. One agent, a
              connected stack of two to three, or a full operational stack of four or more. Every
              engagement includes the organizational review that makes the technology actually work.
            </p>
          </motion.div>
        </div>
      </section>

      <section
        id="discovery"
        className="scroll-mt-24 border-t border-b border-[#3B82F6] bg-[#1A1D2E] py-12 sm:py-14"
        aria-label="Discovery Call"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <motion.div {...fadeUp}>
              <Kicker>Before you commit</Kicker>
              <p className="mt-2 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                Before you commit six figures to an AI stack, spend ninety minutes and five hundred
                dollars making sure you&apos;re building the right thing. The Discovery Call is a
                structured working session with a twenty-six-year operator. You leave with a
                personalized AI roadmap: a one-page summary of where AI pays in your operation,
                which workflows to prioritize, and which engagement tier fits. Credited in full
                against any engagement started within thirty days.
              </p>
              <DiscoveryDeliverableBlock />
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.18, delay: 0.05 }}
              className="flex flex-col items-start gap-4 lg:items-end lg:text-right"
            >
              <p className="text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl">$500</p>
              <p className="max-w-sm text-sm text-[#94A3B8] lg:text-right">
                Credited toward engagement if upgraded within 30 days.
              </p>
              <Link
                href="/book#discovery"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90"
              >
                Book a Discovery Call · $500
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <p className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-[#94A3B8]">
        Not ready for a Discovery Call?{' '}
        <Link href="/book" className="font-medium text-[#3B82F6] hover:underline">
          Book a free 15-minute fit call â
        </Link>
      </p>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {engagementTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.18, delay: index * 0.04 }}
            >
              <ServiceCard tier={tier} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-[rgba(148,163,184,0.15)] bg-[#1A1D2E]/60 py-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center sm:flex-row sm:text-left">
          <p className="text-base font-medium text-[#F8FAFC] sm:flex-1">
            Not sure which tier fits? Start with a Discovery Call.
          </p>
          <Link
            href="/book"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/10"
          >
            Book a Discovery Call · $500
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
