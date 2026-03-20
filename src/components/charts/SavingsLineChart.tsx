import { motion } from 'framer-motion'
import { useMemo } from 'react'

type SavingsLineChartProps = {
  data: number[]
  width?: number
  height?: number
}

function buildPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return ''
  const d: string[] = []
  d.push(`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`)
  for (let i = 1; i < points.length; i++) {
    d.push(`L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`)
  }
  return d.join(' ')
}

export function SavingsLineChart({
  data,
  width = 540,
  height = 220,
}: SavingsLineChartProps) {
  const { pathD, areaD, yMin, yMax } = useMemo(() => {
    const padding = 14
    const yMinLocal = Math.min(...data)
    const yMaxLocal = Math.max(...data)
    const safeRange = yMaxLocal - yMinLocal || 1

    const xStep = (width - padding * 2) / Math.max(1, data.length - 1)
    const points = data.map((v, i) => {
      const x = padding + i * xStep
      const t = (v - yMinLocal) / safeRange
      const y = padding + (1 - t) * (height - padding * 2)
      return { x, y }
    })

    const pathDLocal = buildPath(points)
    // Close area path.
    const area = `${pathDLocal} L ${points[points.length - 1].x.toFixed(
      2
    )} ${(height - padding).toFixed(2)} L ${points[0].x.toFixed(2)} ${(height - padding).toFixed(
      2
    )} Z`

    return { pathD: pathDLocal, areaD: area, yMin: yMinLocal, yMax: yMaxLocal }
  }, [data, height, width])

  const gradId = useMemo(() => `mq-line-grad-${Math.random().toString(16).slice(2)}`, [])

  const up = data.length ? data[data.length - 1] >= data[0] : true

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[240px] w-full">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={up ? '#1A6D9D' : '#EF4444'} stopOpacity="1" />
            <stop offset="100%" stopColor={up ? '#10B981' : '#EF4444'} stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`${gradId}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={up ? '#1A6D9D' : '#EF4444'} stopOpacity="0.28" />
            <stop offset="100%" stopColor={up ? '#10B981' : '#EF4444'} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Soft grid */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const y = 14 + (1 - t) * (height - 28)
          return (
            <path
              key={t}
              d={`M 14 ${y} L ${width - 14} ${y}`}
              stroke="rgba(26,109,157,0.12)"
              strokeWidth={1}
            />
          )
        })}

        <path d={areaD} fill={`url(#${gradId}-area)`} />

        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={3.2}
          strokeLinecap="round"
          pathLength={1}
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.05 }}
          style={{ strokeDasharray: 1 }}
        />
      </svg>
      <div className="sr-only">
        Chart values range {yMin} to {yMax}
      </div>
    </div>
  )
}

