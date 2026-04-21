import { useEffect, useState } from 'react'
import { Link } from 'wouter'

export type NavbarLinkMode = 'home' | 'site'

type NavbarProps = {
  /** Kept for call-site compatibility. */
  linkMode: NavbarLinkMode
}

const navLinkClass = 'text-sm text-[#94A3B8] hover:text-[#3B82F6]'

export function Navbar(_props: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? 'border-b border-[rgba(148,163,184,0.2)] bg-[rgba(26,29,46,0.94)] backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/">
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
            className="text-sm font-bold text-[#F8FAFC] md:text-base"
          >
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
            <span className="hidden sm:inline">A W Greber Consulting</span>
          </a>
        </Link>
        <nav className="hidden flex-1 items-center justify-end gap-6 text-sm lg:flex">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
          <Link href="/services" className={navLinkClass}>
            Services
          </Link>
          <Link href="/meet-the-agents" className={navLinkClass}>
            Meet the Agents
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
          <Link
            href="/book"
            className="rounded-lg border border-[#3B82F6] px-3 py-1.5 text-sm font-semibold text-[#3B82F6] transition-colors hover:bg-[#3B82F6]/10"
          >
            Book
          </Link>
        </nav>
        <Link
          href="/book"
          className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 lg:hidden"
        >
          Book
        </Link>
      </div>
    </header>
  )
}
