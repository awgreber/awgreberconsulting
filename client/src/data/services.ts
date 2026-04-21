export type TierId = 'discovery' | 'assessment' | 'teddy' | 'ollie' | 'baxter'

export interface Tier {
  id: TierId
  name: string
  tagline: string
  description: string
  summary: string
  /** Qualification copy for engagement tiers; omitted on discovery-only data when unused in cards. */
  signals?: string
  price: string
  priceNote?: string
  cta: { label: string; href: string }
  implementations: string
}

export type DiscoveryCallPlus = Omit<Tier, 'description' | 'signals'>

export const discoveryCallPlus: DiscoveryCallPlus = {
  id: 'discovery',
  name: 'Discovery Call Plus',
  tagline: 'Before you commit.',
  summary: '90-minute working session, one-page summary.',
  price: '$500',
  priceNote: 'Credited toward engagement if upgraded within 30 days.',
  cta: { label: 'Book a Discovery Call → $500', href: '/book#discovery' },
  implementations: 'None',
}

export const engagementTiers: Tier[] = [
  {
    id: 'assessment',
    name: 'Assessment Only',
    tagline: 'For operators who need direction, not implementation.',
    description:
      'Focused engagement identifying where your operation loses time, where structure is misaligned, and where AI can recover hours. Delivered as a written assessment with prioritized recommendations spanning workflow, team structure, and technology, including an organizational review showing how your team scales once the tools are in place.',
    summary:
      "Direction without implementation. For operators who know AI is next but aren't sure where to start.",
    signals:
      'You know your team is losing hours. You suspect AI is part of the answer. You are not ready to commit to a build until you have a scoped plan you trust.',
    price: '$3,500 flat',
    cta: { label: 'Start an assessment', href: '/contact' },
    implementations: 'None',
  },
  {
    id: 'teddy',
    name: 'Assessment + Teddy Build',
    tagline: 'For operators taking the first step into AI.',
    description:
      'Diagnostic assessment plus one AI implementation built to address the highest-priority opportunity surfaced. Includes an organizational review showing which tasks go away, which roles evolve, and how your team redirects recovered hours toward growth.',
    summary: 'One workflow changes. Your team sees what AI can do inside your operation.',
    signals:
      "Your team has never shipped an AI workflow. You're not sure which problem to start with. You need one win to build internal belief before you scale.",
    price: '$7,500 flat',
    cta: { label: 'Start a Teddy build', href: '/contact' },
    implementations: 'One',
  },
  {
    id: 'ollie',
    name: 'Assessment + Ollie Build',
    tagline: 'For operators building a connected stack.',
    description:
      'Roadmap assessment plus two to three integrated AI implementations. Includes an organizational review sequenced alongside the stack build, so each AI deployment lands with the team structure that makes it work.',
    summary:
      'Multiple workflows connect. Team structure begins to evolve around the new capability.',
    signals:
      "You've run one or two pilots. They worked in isolation but did not connect. Your team structure has not adjusted and the recovered hours are being absorbed back into the old workflow.",
    price: 'Contact for pricing',
    cta: { label: 'Discuss an Ollie build', href: '/contact' },
    implementations: 'Two to three',
  },
  {
    id: 'baxter',
    name: 'Assessment + Baxter Build',
    tagline: 'For operators rebuilding operations around AI.',
    description:
      'Full roadmap assessment plus four or more integrated AI implementations across the operation. Includes a complete organizational review: which functions consolidate, which roles emerge, and how human capital redeploys against the operation AI cannot run.',
    summary: 'The operation is built around AI. Roles are redesigned around what only humans can do.',
    signals:
      "AI is already in several functions. You're hitting the ceiling where adding more tools without redesigning the team structure produces diminishing returns. The next step is organizational, not technical.",
    price: 'Contact for pricing',
    cta: { label: 'Discuss a Baxter build', href: '/contact' },
    implementations: 'Four or more',
  },
]
