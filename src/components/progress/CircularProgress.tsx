import { motion } from 'framer-motion'
import { useMemo } from 'react'

type CircularProgressProps = {
  value: number // 0..100
  size?: number
  strokeWidth?: number
  label?: string
}

export function CircularProgress({
  value,
  size = 86,
  strokeWidth = 10,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, value))
  const dashOffset = circumference * (1 - pct / 100)

  const gradId = useMemo(
    () => `mq-grad-${Math.random().toString(16).slice(2)}`,
    []
  )

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1A6D9D" stopOpacity="1" />
            <stop offset="1" stopColor="#10B981" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
          opacity={0.35}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.9 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-extrabold tracking-tight text-mq-textPrimary">
          {Math.round(pct)}%
        </div>
        {label ? (
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  )
}

