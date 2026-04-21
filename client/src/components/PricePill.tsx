type PricePillProps = {
  amount: string
  cadence?: string
  variant?: 'default' | 'flat' | 'contact'
}

const variantClass: Record<NonNullable<PricePillProps['variant']>, string> = {
  default:
    'border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.15)] text-[#3B82F6]',
  flat: 'bg-[#F8FAFC] text-[#0F1117]',
  contact:
    'border border-[rgba(148,163,184,0.3)] bg-[#1A1D2E] text-[#94A3B8]',
}

export function PricePill({ amount, cadence, variant = 'default' }: PricePillProps) {
  const v = variantClass[variant] ?? variantClass.default
  const isLong = amount.length > 12

  return (
    <span
      className={`inline-flex max-w-full flex-wrap items-baseline rounded-full px-3 py-1 text-xs font-medium tracking-wide sm:px-4 ${isLong ? 'whitespace-normal text-center leading-snug' : 'whitespace-nowrap'} ${v}`.trim()}
    >
      <span>{amount}</span>
      {cadence ? (
        <>
          <span className="mx-0.5 opacity-60" aria-hidden>
            /
          </span>
          <span className="opacity-70">{cadence}</span>
        </>
      ) : null}
    </span>
  )
}
