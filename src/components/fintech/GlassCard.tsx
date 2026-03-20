import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  strong?: boolean
}

export function GlassCard({ children, className, strong }: GlassCardProps) {
  const base = strong ? 'mq-card-strong' : 'mq-card'
  return (
    <div className={`${base} ${className ?? ''}`.trim()}>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mq-primary/18 via-white/0 to-mq-purple/10 blur-[14px]" />
      <span className="pointer-events-none absolute -top-24 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-mq-primary/18 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-24 left-10 h-52 w-52 rounded-full bg-mq-purple/10 blur-3xl" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/10" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

