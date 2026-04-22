import { Link } from 'wouter'
import type { Tier } from '../data/services'
import { PricePill } from './PricePill'

function priceVariant(price: string): 'flat' | 'contact' | 'default' {
  if (/contact/i.test(price)) return 'contact'
  if (/flat/i.test(price)) return 'flat'
  return 'default'
}

export function ServiceCard({ tier }: { tier: Tier }) {
  const variant = priceVariant(tier.price)

  return (
    <article
      id={tier.id}
      className="scroll-mt-24 relative flex h-full flex-col rounded-xl border-[0.5px] border-white/[0.05] bg-[#1A1D2E] p-6 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      <h3 className="mb-2 text-base font-medium text-[#F8FAFC] md:text-lg">{tier.name}</h3>
      {tier.scopeLabel ? (
        <p className="mb-2 text-xs font-medium tracking-wide text-[#64748B]">{tier.scopeLabel}</p>
      ) : null}
      <p className="mb-3 text-sm text-[#94A3B8]">{tier.tagline}</p>

      <p className="mb-3 flex-1 text-sm leading-relaxed text-[#94A3B8]">{tier.description}</p>

      {tier.signals ? (
        <>
          <div className="my-4 border-t border-[#94A3B8]/20" aria-hidden />
          <p className="text-xs font-medium text-[#3B82F6]">{"Signals you're at this stage"}</p>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">{tier.signals}</p>
        </>
      ) : null}

      <p className="mb-3 mt-1 text-sm italic text-[#3B82F6]">{tier.summary}</p>

      <div className="mb-3">
        <PricePill amount={tier.price} variant={variant} />
      </div>

      {tier.priceNote ? (
        <p className="mb-4 text-xs text-[#94A3B8]">{tier.priceNote}</p>
      ) : null}

      <Link
        href={tier.cta.href}
        className="mt-auto inline-flex min-h-10 items-center justify-center rounded-lg bg-[#3B82F6] px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {tier.cta.label}
      </Link>
    </article>
  )
}
