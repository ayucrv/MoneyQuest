import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '../../lib/cn'

type FormatType = 'int' | 'currency' | 'percent' | 'float'

type AnimatedNumberProps = {
  value: number
  format?: FormatType
  decimals?: number
  className?: string
  durationMs?: number
  prefix?: string
  suffix?: string
}

export function AnimatedNumber({
  value,
  format = 'int',
  decimals,
  className,
  durationMs = 900,
  prefix,
  suffix,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const start = 0
    const end = value
    const startTime = performance.now()

    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs)
      // Ease out cubic for a premium feel.
      const eased = 1 - Math.pow(1 - t, 3)
      const next = start + (end - start) * eased
      setDisplay(next)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs, isInView, value])

  const formatter = useMemo(() => {
    const d =
      decimals ??
      (format === 'float' || format === 'currency' ? 2 : format === 'percent' ? 1 : 0)

    const opts: Intl.NumberFormatOptions = {
      maximumFractionDigits: d,
      minimumFractionDigits: d,
    }

    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        ...opts,
        style: 'currency',
        currency: 'USD',
      })
    }
    if (format === 'percent') {
      return new Intl.NumberFormat('en-US', {
        ...opts,
        style: 'percent',
        maximumFractionDigits: d,
      })
    }
    if (format === 'int') {
      return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
    }
    return new Intl.NumberFormat('en-US', opts)
  }, [decimals, format])

  const text = useMemo(() => {
    const base =
      format === 'percent' ? formatter.format(display) : formatter.format(display)
    return `${prefix ?? ''}${base}${suffix ?? ''}`
  }, [display, format, formatter, prefix, suffix])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {text}
    </span>
  )
}

