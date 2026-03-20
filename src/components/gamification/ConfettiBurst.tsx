import { AnimatePresence, motion } from 'framer-motion'

const COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#0F172A']

type ConfettiBurstProps = {
  active: boolean
  onDone?: () => void
}

export function ConfettiBurst({ active, onDone }: ConfettiBurstProps) {
  const pieces = Array.from({ length: 28 }).map((_, i) => {
    const color = COLORS[i % COLORS.length]
    const x = (Math.random() - 0.5) * 160
    const rotate = (Math.random() - 0.5) * 250
    const delay = Math.random() * 0.12
    const duration = 0.9 + Math.random() * 0.35
    return { id: `${i}-${Math.random()}`, color, x, rotate, delay, duration }
  })

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => onDone?.()}
        >
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute left-1/2 top-1/2 h-2 w-3 rounded-sm"
              style={{ background: p.color }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: p.x,
                y: -180,
                rotate: p.rotate,
                opacity: 0,
              }}
              transition={{ delay: p.delay, duration: p.duration }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

