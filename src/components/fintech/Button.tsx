import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type Ripple = {
  id: string
  x: number
  y: number
  size: number
}

type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [seed, setSeed] = useState(0)

  const styles = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return {
          wrapper:
            'border border-white/15 bg-white/5 text-mq-textPrimary hover:bg-white/10',
          glow: 'shadow-[0_0_0_4px_rgba(26,109,157,0.18)]',
        }
      case 'ghost':
        return {
          wrapper: 'bg-transparent text-mq-textPrimary hover:bg-white/5',
          glow: 'shadow-none',
        }
      default:
        return {
          wrapper:
            'text-mq-textPrimary border border-mq-primary/40 bg-[linear-gradient(90deg,rgba(26,109,157,0.95),rgba(16,185,129,0.55))] hover:brightness-110',
          glow: 'shadow-[0_0_0_4px_rgba(26,109,157,0.28)]',
        }
    }
  }, [variant])

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 1.2

    const id = `${Date.now()}-${seed}`
    setSeed((s) => s + 1)
    setRipples((prev) => [...prev, { id, x, y, size }])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 650)

    onClick?.()
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-mq-primary/45 focus-visible:ring-offset-2 focus-visible:ring-offset-mq-background',
        styles.wrapper,
        styles.glow,
        className ?? '',
        disabled ? 'opacity-60 cursor-not-allowed' : ''
      )}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/25 mix-blend-overlay"
          style={{
            width: r.size,
            height: r.size,
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            transform: 'translateZ(0)',
            animation: 'mq-ripple 650ms ease-out forwards',
          }}
        />
      ))}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  )
}

