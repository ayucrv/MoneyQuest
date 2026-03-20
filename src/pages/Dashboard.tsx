import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/fintech/GlassCard'
import { AnimatedNumber } from '../components/fintech/AnimatedNumber'
import { CircularProgress } from '../components/progress/CircularProgress'
import { SparklesIcon, ChartIcon, CheckIcon } from '../components/icons/FinIcons'

type Badge = {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export function Dashboard() {
  const badges = useMemo<Badge[]>(
    () => [
      {
        id: 'b1',
        title: 'First Simulation',
        description: 'Complete your first quiz correctly.',
        unlocked: true,
      },
      {
        id: 'b2',
        title: '7-Day Spending Tracker',
        description: 'Project 7 days without dipping negative.',
        unlocked: false,
      },
      {
        id: 'b3',
        title: 'Budget Master',
        description: 'Finish a budgeting lesson.',
        unlocked: true,
      },
      {
        id: 'b4',
        title: 'Risk Explorer',
        description: 'Complete the risk vs return lesson.',
        unlocked: false,
      },
      {
        id: 'b5',
        title: 'Compounding Builder',
        description: 'Run a 1-year simulation with positive net.',
        unlocked: true,
      },
    ],
    []
  )

  // Static demo state for now; you can wire this to real auth later.
  const [levelProgress] = useState(68) // 0..100

  return (
    <main className="mq-section py-8 sm:py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mq-pill">
            <SparklesIcon size={16} className="text-mq-primary" />
            Analytics Dashboard
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-mq-textPrimary sm:text-3xl">
            Your learning + finance progress
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Track stats, level advancement, and achievements with premium fintech-style visuals.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ChartIcon size={22} className="text-mq-primary" />}
          label="Total Score"
          value={1860}
        />
        <StatCard
          icon={<SparklesIcon size={22} className="text-mq-purple" />}
          label="Current Level"
          value={7}
          suffix=""
        />
        <StatCard
          icon={<CheckIcon size={22} className="text-mq-gold" />}
          label="Lessons Completed"
          value={12}
        />
        <StatCard
          icon={<SparklesIcon size={22} className="text-mq-primary" />}
          label="Simulations Run"
          value={9}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
        <GlassCard strong className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Level System Visualization
              </div>
              <div className="mt-2 text-lg font-extrabold text-mq-textPrimary">
                Level advancement to your next milestone
              </div>
            </div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.22 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Progress
              </div>
              <div className="mt-1 text-xl font-extrabold text-mq-textPrimary">
                {levelProgress}%
              </div>
            </motion.div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-[140px_1fr] items-center">
            <CircularProgress value={levelProgress} label="Level" />

            <div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-mq-primary to-mq-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 0.9 }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-white/55">
                <span>Start</span>
                <span>Next</span>
              </div>
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/65">
                You’re building strong financial habits. Keep finishing lessons to unlock badges that reinforce real-world decisions.
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard strong className="p-6 sm:p-7">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Badge Collection
          </div>
          <div className="mt-2 text-lg font-extrabold text-mq-textPrimary">Achievements</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {badges.map((b) => (
              <BadgeTile key={b.id} badge={b} />
            ))}
          </div>
        </GlassCard>
      </div>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
  suffix,
}: {
  icon: ReactNode
  label: string
  value: number
  suffix?: string
}) {
  const positive = true
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
    >
      <GlassCard className="h-full p-5 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              {label}
            </div>
            <div className="mt-2 text-3xl font-extrabold tracking-tight text-mq-textPrimary tabular-nums">
              <AnimatedNumber value={value} format="int" />
              {suffix ? <span className="ml-1 text-lg font-extrabold">{suffix}</span> : null}
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            {icon}
          </div>
        </div>
        <div className="mt-3 text-sm leading-6 text-white/65">
          {positive ? 'Keep going to reach the next milestone.' : 'Adjust your plan for better results.'}
        </div>
      </GlassCard>
    </motion.div>
  )
}

function BadgeTile({ badge }: { badge: { title: string; description: string; unlocked: boolean; id: string } }) {
  return (
    <motion.div
      whileHover={badge.unlocked ? { y: -3 } : undefined}
      transition={{ duration: 0.22 }}
      className="relative"
    >
      <div
        className={[
          'h-full rounded-3xl border p-4 backdrop-blur-xl transition-all',
          badge.unlocked
            ? 'border-mq-gold/25 bg-white/5 shadow-[0_18px_60px_rgba(245,158,11,0.10)]'
            : 'border-white/10 bg-white/5 text-white/55',
        ].join(' ')}
      >
        {badge.unlocked ? (
          <motion.div
            initial={{ x: '-80%', opacity: 0 }}
            animate={{ x: '80%', opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-mq-gold/40 to-transparent blur-[1px]" />
          </motion.div>
        ) : null}

        <div className="relative">
          <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/55">
            {badge.unlocked ? 'Unlocked' : 'Locked'}
          </div>
          <div className="mt-2 text-sm font-extrabold text-mq-textPrimary">{badge.title}</div>
          <div className="mt-1 text-xs leading-5 text-white/65">
            {badge.unlocked ? badge.description : 'Complete the next mission to unlock.'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

