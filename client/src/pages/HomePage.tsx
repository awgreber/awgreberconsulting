import { motion } from 'framer-motion'
import { Link } from 'wouter'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { Navbar } from '../components/Navbar'

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.18 },
}

const primaryBtnClass =
  'inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 sm:w-auto'

const secondaryBtnClass =
  'inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[#3B82F6] px-8 text-base font-semibold text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/10 sm:w-auto'

export function HomePage() {
  return (
    <div className="bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="home" />

      {/* 1. Newsletter */}
      <NewsletterSignup />

      {/* 2. Hero */}
      <section className="relative overflow-hidden border-b border-[rgba(148,163,184,0.18)] py-24 sm:py-28">
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
            <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] md:text-5xl lg:text-6xl">
              Recovered Hours, Redeployed
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
              AI implementation paired with organizational design
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
              Every engagement pairs an AI build with an organizational review. I help operators identify
              which tasks go away, which roles evolve, and how to redeploy recovered hours toward growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Two-card calls */}
      <section className="bg-[#1A1D2E] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="text-center">
            <Kicker>Talk to me</Kicker>
            <h2 className="mt-2 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
              Two ways to start a conversation
            </h2>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
            <motion.article
              {...fadeUp}
              transition={{ duration: 0.18, delay: 0.05 }}
              className="flex h-full flex-col rounded-xl border border-[rgba(59,130,246,0.3)] bg-[#0F1117] p-8"
            >
              <p className="text-xs font-medium tracking-wide text-[#3B82F6]">Free</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
                15-minute fit call
              </h3>
              <p className="mt-4 flex-1 text-left text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                A structured fifteen-minute call with one purpose: deciding whether we should work
                together. No operational advice given here. We talk about what you&apos;re running,
                what you&apos;re trying to change, and whether my practice is the right fit.
              </p>
              <Link href="/book" className={`${secondaryBtnClass} mt-8 w-full sm:w-full`}>
                Book a Fit Call · Free
              </Link>
            </motion.article>

            <motion.article
              {...fadeUp}
              transition={{ duration: 0.18, delay: 0.1 }}
              className="flex h-full flex-col rounded-xl border border-[rgba(59,130,246,0.3)] bg-[#0F1117] p-8"
            >
              <p className="text-xs font-medium tracking-wide text-[#3B82F6]">$500</p>
              <h3 className="mt-3 text-2xl font-semibold text-[#F8FAFC] md:text-3xl">
                Discovery Call
              </h3>
              <p className="mt-4 flex-1 text-left text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                Ninety-minute working session. You&apos;ll receive a personalized AI roadmap. a one-page
                summary of where AI pays in your operation, which workflows to prioritize, and which
                engagement tier fits. Credited in full against any engagement started within thirty
                days.
              </p>
              <Link href="/book" className={`${primaryBtnClass} mt-8 w-full sm:w-full`}>
                Book a Discovery Call · $500
              </Link>
            </motion.article>
          </div>
        </div>
      </section>

      {/* 5. Agents illustration */}
      <section className="bg-[#0F1117] px-6 py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.div {...fadeUp} className="w-full">
            <img
              src="/agents.jpg"
              alt=""
              className="mx-auto w-full max-w-5xl rounded-xl object-cover"
            />
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mt-8 text-base font-medium text-[#F8FAFC]"
          >
            Teddy, Ollie, Baxter. Three examples at three scales
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.18, delay: 0.08 }} className="mt-3">
            <Link
              href="/meet-the-agents"
              className="text-sm text-[#94A3B8] hover:text-[#3B82F6]"
            >
              Meet the agents →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. Bottom CTA strip */}
      <section className="bg-[#1A1D2E] px-6 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.p {...fadeUp} className="text-lg font-medium text-[#F8FAFC]">
            Ready to talk?
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.18, delay: 0.05 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/book" className={primaryBtnClass}>
              Book a Discovery Call · $500
            </Link>
            <Link href="/book" className={secondaryBtnClass}>
              Book a Fit Call · Free
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
