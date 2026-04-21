import type { ReactNode } from 'react'

type KickerProps = {
  children: ReactNode
  className?: string
}

/** Section label: sentence case, accent color (no all-caps). */
export function Kicker({ children, className = '' }: KickerProps) {
  return (
    <span className={`block text-xs font-medium tracking-wide text-[#3B82F6] mb-2 ${className}`.trim()}>
      {children}
    </span>
  )
}
