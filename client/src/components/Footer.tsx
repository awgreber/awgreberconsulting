import { Link } from 'wouter'
import { Kicker } from './Kicker'

export function Footer() {
  return (
    <footer className="border-t border-[rgba(148,163,184,0.2)] bg-[#1A1D2E]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
              className="shrink-0"
            >
              <rect width="36" height="36" rx="6" fill="#3B82F6" />
              <text
                x="18"
                y="24"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="white"
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.5"
              >
                AWG
              </text>
            </svg>
            <p className="text-lg font-semibold text-[#F8FAFC]">A.W. Greber Consulting</p>
          </div>
          <p className="mt-3 text-sm text-[#94A3B8]">Operations leadership for the AI era.</p>
          <p className="mt-2 text-xs text-[#64748B]">A.W. Greber Consulting LLC</p>
          <p className="mt-2 text-xs leading-relaxed text-[#64748B]">
            2108 N St, Ste N, Sacramento, CA 95816
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
            The Operator&apos;s Edge. Practical AI for small business operators.
          </p>
        </div>

        <div>
          <Kicker className="mb-0">Services</Kicker>
          <ul className="mt-4 space-y-2 text-sm text-[#94A3B8]">
            <li>
              <Link href="/services" className="hover:text-[#3B82F6]">
                Engagement Tiers
              </Link>
            </li>
            <li>
              <Link href="/meet-the-agents" className="hover:text-[#3B82F6]">
                Meet the Agents
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Kicker className="mb-0">Contact</Kicker>
          <ul className="mt-4 space-y-3 text-sm text-[#94A3B8]">
            <li>
              <Link href="/book" className="hover:text-[#3B82F6]">
                Book a call
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#3B82F6]">
                Contact form
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#3B82F6]">
                About
              </Link>
            </li>
            <li>
              <a href="mailto:andrew@awgreber.com" className="hover:text-[#3B82F6]">
                andrew@awgreber.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 pb-6 text-center sm:px-6">
        <a
          href="https://aistackforsmb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#94A3B8] hover:text-[#3B82F6]"
        >
          For 200+ AI tools across SMB industries, see AIStackForSMB →
        </a>
      </div>

      <div className="border-t border-[rgba(148,163,184,0.2)] px-4 py-4 text-center sm:px-6">
        <p className="text-xs text-[#94A3B8]">
          © 2026 A.W. Greber Consulting LLC. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
