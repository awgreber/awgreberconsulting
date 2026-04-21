import { useEffect, type ReactNode } from 'react'
import { Link } from 'wouter'
import { Footer } from '../components/Footer'
import { Kicker } from '../components/Kicker'
import { Navbar } from '../components/Navbar'

// TODO: replace with Calendly, Cal.com, or Microsoft Bookings URL for 15-min fit call.
const FIT_CALL_CALENDAR_URL = ''

// TODO: replace with Calendly, Cal.com, or Microsoft Bookings URL for 90-min Discovery Call Plus.
const DISCOVERY_CALL_CALENDAR_URL = ''

function calendarHref(url: string, fallback: string): string {
  return url.trim().length > 0 ? url.trim() : fallback
}

function BookCta({
  href,
  external,
  className,
  children,
}: {
  href: string
  external: boolean
  className: string
  children: ReactNode
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function DeliverableBlock() {
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

export function BookPage() {
  useEffect(() => {
    if (window.location.hash === '#discovery') {
      document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const fitHref = calendarHref(FIT_CALL_CALENDAR_URL, '/contact')
  const discoveryHref = calendarHref(DISCOVERY_CALL_CALENDAR_URL, '/contact')
  const fitExternal = FIT_CALL_CALENDAR_URL.trim().length > 0
  const discoveryExternal = DISCOVERY_CALL_CALENDAR_URL.trim().length > 0

  const cardClass =
    'flex flex-col rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#1A1D2E] p-6 sm:p-8'

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#F8FAFC]">
      <Navbar linkMode="site" />

      <div className="mx-auto max-w-[900px] px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        <header className="text-center">
          <Kicker>Book a call</Kicker>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl">
            Two ways to start a conversation
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Pick the call that matches where you are. Both go on the same calendar.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className={cardClass}>
            <p className="text-xs font-medium uppercase tracking-wider text-[#3B82F6]">Free</p>
            <h2 className="mt-2 text-xl font-semibold text-[#F8FAFC]">15-minute fit call</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              A structured fifteen-minute call with one purpose: deciding whether we should work
              together. No operational advice given here. We talk about what you&apos;re running,
              what you&apos;re trying to change, and whether my practice is the right fit. If it is,
              we schedule a Discovery Call Plus. If it isn&apos;t, I&apos;ll point you toward
              someone who is.
            </p>
            <div className="mt-5 text-sm text-[#94A3B8]">
              <ul className="list-disc space-y-1 pl-5">
                <li>What&apos;s your operation?</li>
                <li>What&apos;s the problem you&apos;re trying to solve?</li>
                <li>Is this practice the right fit?</li>
              </ul>
            </div>
            <BookCta
              href={fitHref}
              external={fitExternal}
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Book a fit call
            </BookCta>
          </div>

          <div id="discovery" className={`${cardClass} scroll-mt-28 ring-1 ring-[rgba(59,130,246,0.25)]`}>
            <p className="text-xs font-medium uppercase tracking-wider text-[#3B82F6]">$500</p>
            <h2 className="mt-2 text-xl font-semibold text-[#F8FAFC]">Discovery Call Plus</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              Ninety-minute working session with a twenty-six-year operator. You leave with a
              personalized AI roadmap: a one-page summary of where AI pays in your operation, which
              workflows to prioritize, and which engagement tier fits. Credited in full against any
              engagement started within thirty days.
            </p>
            <DeliverableBlock />
            <BookCta
              href={discoveryHref}
              external={discoveryExternal}
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Book a Discovery Call → $500
            </BookCta>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-[#94A3B8]">
          Prefer to write it out?{' '}
          <Link href="/contact" className="font-medium text-[#3B82F6] hover:underline">
            Use the contact form
          </Link>{' '}
          instead.
        </p>
      </div>

      <Footer />
    </div>
  )
}
