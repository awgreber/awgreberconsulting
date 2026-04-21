import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'wouter'
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

function OllieHudWidget() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showPlayOverlay, setShowPlayOverlay] = useState(true)

  const handleVideoClick = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (v.ended) v.currentTime = 0
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [])

  return (
    <>
      <style>
        {`
          @keyframes ollie-hud-glow {
            0%, 100% {
              box-shadow:
                0 0 14px rgba(59, 130, 246, 0.4),
                0 0 28px rgba(59, 130, 246, 0.2);
            }
            50% {
              box-shadow:
                0 0 28px rgba(59, 130, 246, 0.75),
                0 0 52px rgba(59, 130, 246, 0.45);
            }
          }
          @keyframes ollie-hud-scan {
            0% { top: 0; }
            100% { top: calc(100% - 3px); }
          }
          @keyframes ollie-hud-online-dot {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
            50% { opacity: 0.85; transform: scale(0.92); box-shadow: 0 0 8px 2px rgba(16, 185, 129, 0.45); }
          }
          @keyframes ollie-hud-bar-revenue {
            0%, 100% { width: 68%; }
            50% { width: 92%; }
          }
          @keyframes ollie-hud-bar-eff {
            0%, 100% { width: 55%; }
            50% { width: 84%; }
          }
          @keyframes ollie-hud-bar-ins {
            0%, 100% { width: 72%; }
            50% { width: 96%; }
          }
          .ollie-hud-glow-ring {
            animation: ollie-hud-glow 2s ease-in-out infinite;
            border-radius: 0.625rem;
          }
          .ollie-hud-scan-line {
            position: absolute;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(59, 130, 246, 0.3),
              transparent
            );
            animation: ollie-hud-scan 3s linear infinite;
            pointer-events: none;
          }
          .ollie-hud-bracket {
            position: absolute;
            width: 20px;
            height: 20px;
            border-color: #3b82f6;
            border-style: solid;
            pointer-events: none;
          }
          .ollie-hud-bracket-tl {
            top: 10px;
            left: 10px;
            border-width: 2px 0 0 2px;
          }
          .ollie-hud-bracket-tr {
            top: 10px;
            right: 10px;
            border-width: 2px 2px 0 0;
          }
          .ollie-hud-bracket-bl {
            bottom: 36px;
            left: 10px;
            border-width: 0 0 2px 2px;
          }
          .ollie-hud-bracket-br {
            bottom: 36px;
            right: 10px;
            border-width: 0 2px 2px 0;
          }
          .ollie-hud-bar-fill-rev,
          .ollie-hud-bar-fill-eff,
          .ollie-hud-bar-fill-ins {
            display: block;
            height: 100%;
            max-width: 100%;
          }
          .ollie-hud-bar-fill-rev {
            animation: ollie-hud-bar-revenue 2.4s ease-in-out infinite;
          }
          .ollie-hud-bar-fill-eff {
            animation: ollie-hud-bar-eff 2.8s ease-in-out infinite;
          }
          .ollie-hud-bar-fill-ins {
            animation: ollie-hud-bar-ins 2.2s ease-in-out infinite;
          }
          .ollie-hud-online-dot {
            animation: ollie-hud-online-dot 1.8s ease-in-out infinite;
          }
        `}
      </style>
      <div className="mx-auto w-full max-w-[min(100%,320px)]">
        <div className="ollie-hud-glow-ring bg-[#0f1117] p-[2px]">
          <div className="relative overflow-hidden rounded-[10px] bg-[#0f1117]">
            <div className="relative w-full cursor-pointer" onClick={handleVideoClick}>
              <video
                ref={videoRef}
                src={encodeURI('/Ollie Agent.mp4')}
                className="pointer-events-none block aspect-video w-full rounded-[8px] object-cover"
                loop
                playsInline
                onPlay={() => setShowPlayOverlay(false)}
                onPause={() => setShowPlayOverlay(true)}
                onEnded={() => setShowPlayOverlay(true)}
                aria-label="Ollie agent preview"
              />
              {showPlayOverlay ? (
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[8px]"
                  aria-hidden
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 sm:h-[4.5rem] sm:w-[4.5rem]">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-8 w-8 text-white"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[8px]"
              aria-hidden
            >
              <div className="ollie-hud-scan-line" />
            </div>

            <div className="ollie-hud-bracket ollie-hud-bracket-tl" aria-hidden />
            <div className="ollie-hud-bracket ollie-hud-bracket-tr" aria-hidden />
            <div className="ollie-hud-bracket ollie-hud-bracket-bl" aria-hidden />
            <div className="ollie-hud-bracket ollie-hud-bracket-br" aria-hidden />

            <div
              className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded bg-[rgba(15,17,23,0.85)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#f8fafc] sm:right-3 sm:top-3 sm:text-[11px]"
              role="status"
            >
              <span className="ollie-hud-online-dot inline-block h-2 w-2 rounded-full bg-[#10b981]" />
              ONLINE
            </div>

            <div className="absolute bottom-11 left-1.5 z-10 max-w-[46%] rounded border border-[rgba(59,130,246,0.35)] bg-[rgba(15,17,23,0.88)] px-2 py-1.5 text-[9px] leading-tight sm:bottom-14 sm:left-2.5 sm:max-w-[140px] sm:px-2.5 sm:py-2 sm:text-[10px]">
              <div className="font-semibold uppercase tracking-wide text-[#94a3b8]">
                AGENT STATUS
              </div>
              <div className="font-bold text-[#3b82f6]">ACTIVE</div>
              <div className="mt-1.5 font-semibold uppercase tracking-wide text-[#94a3b8]">
                UNIT
              </div>
              <div className="text-[#f8fafc]">K9-OPS-02</div>
              <div className="mt-1.5 font-semibold uppercase tracking-wide text-[#94a3b8]">
                MODE
              </div>
              <div className="text-[#f8fafc]">MULTI-WORKFLOW</div>
            </div>

            <div className="absolute bottom-11 right-1.5 z-10 max-w-[46%] rounded border border-[rgba(59,130,246,0.35)] bg-[rgba(15,17,23,0.88)] px-2 py-1.5 text-[9px] leading-tight sm:bottom-14 sm:right-2.5 sm:max-w-[140px] sm:px-2.5 sm:py-2 sm:text-[10px]">
              <div className="mb-1.5">
                <div className="font-semibold uppercase tracking-wide text-[#94a3b8]">
                  Revenue
                </div>
                <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(148,163,184,0.25)]">
                  <div className="ollie-hud-bar-fill-rev h-full rounded-full bg-[#3b82f6]" />
                </div>
              </div>
              <div className="mb-1.5">
                <div className="font-semibold uppercase tracking-wide text-[#94a3b8]">
                  Efficiency
                </div>
                <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(148,163,184,0.25)]">
                  <div className="ollie-hud-bar-fill-eff h-full rounded-full bg-[#f59e0b]" />
                </div>
              </div>
              <div>
                <div className="font-semibold uppercase tracking-wide text-[#94a3b8]">
                  Insights
                </div>
                <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-[rgba(148,163,184,0.25)]">
                  <div className="ollie-hud-bar-fill-ins h-full rounded-full bg-[#10b981]" />
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 z-10 border-t border-[rgba(59,130,246,0.25)] bg-[rgba(26,29,46,0.95)] px-2 py-1.5 text-center text-[9px] font-medium uppercase tracking-[0.12em] text-[#3b82f6] sm:text-[10px]"
              style={{ fontVariant: 'small-caps' }}
            >
              Ollie · AI Unit 02 · AWG Consulting
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function OlliePage() {
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
              Ollie. Connected stack
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#94A3B8] md:text-xl">
              Mid-level agent across integrated systems. What we build when an operator is ready to
              connect workflows, not just add one tool.
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
            Two to three implementations. A connected stack across tools.
          </blockquote>
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <motion.div
          {...fadeUp}
          className="overflow-hidden rounded-xl border border-[rgba(148,163,184,0.2)] bg-[#1A1D2E] p-4"
        >
          <OllieHudWidget />
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <motion.div {...fadeUp} className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Link
            href="/book"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#3B82F6] px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book a Discovery Call → $500
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
