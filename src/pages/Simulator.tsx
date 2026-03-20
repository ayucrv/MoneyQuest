import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/fintech/Button'
import { GlassCard } from '../components/fintech/GlassCard'
import { SavingsLineChart } from '../components/charts/SavingsLineChart'
import { CalculatorIcon, SparklesIcon, ChartIcon } from '../components/icons/FinIcons'

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export function Simulator() {
  const [monthlyIncome, setMonthlyIncome] = useState(1200)
  const [dailySpending, setDailySpending] = useState(45)
  const [currentSavings, setCurrentSavings] = useState(300)
  const [ranAt, setRanAt] = useState<number | null>(null)

  const simulation = useMemo(() => {
    const days30 = 30
    const daysYear = 365
    const days5y = 365 * 5

    const dailyIncome = monthlyIncome / days30
    const dailyNet = dailyIncome - dailySpending

    const after1Month = currentSavings + monthlyIncome - dailySpending * days30
    const after1Year = currentSavings + monthlyIncome * 12 - dailySpending * daysYear
    const after5Years =
      currentSavings + monthlyIncome * 12 * 5 - dailySpending * days5y

    let daysRemaining: number | null = null
    if (dailyNet < 0 && currentSavings > 0) {
      // dailyNet is negative => spending exceeds income
      const burnPerDay = -dailyNet
      daysRemaining = Math.floor(currentSavings / burnPerDay)
    }

    // Build a friendly projection curve for the chart (90 days).
    const points: number[] = []
    const days = 90
    for (let i = 0; i <= days; i++) {
      const tDays = i
      const bal = currentSavings + dailyNet * tDays
      points.push(bal)
    }

    return {
      dailyIncome,
      dailyNet,
      after1Month,
      after1Year,
      after5Years,
      daysRemaining,
      points,
    }
  }, [currentSavings, dailySpending, monthlyIncome])

  const alertTone =
    simulation.daysRemaining != null && simulation.daysRemaining <= 30
      ? 'warning'
      : simulation.daysRemaining != null
        ? 'watch'
        : 'good'

  return (
    <main className="mq-section py-8 sm:py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mq-pill">
            <SparklesIcon size={16} className="text-mq-primary" />
            MoneyMirror Engine
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-mq-textPrimary sm:text-3xl">
            Simulator: Project Your Savings
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Enter your numbers, then see how your balance might evolve. The line grows as soon as you
            run the simulation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden rounded-full bg-mq-primary/10 px-4 py-2 text-xs font-semibold text-mq-primary ring-1 ring-mq-primary/20 sm:block">
            {simulation.dailyNet >= 0 ? 'On track' : 'Spending exceeds income'}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[420px_1fr] lg:items-start">
        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
              <div className="text-sm font-extrabold text-mq-textPrimary">Input Panel</div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Your scenario
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20">
              <CalculatorIcon size={20} />
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <NumberField
              label="Monthly Income"
              icon={<ChartIcon size={18} className="text-mq-primary" />}
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              suffix="$ / month"
            />
            <NumberField
              label="Daily Spending"
              icon={<ChartIcon size={18} className="text-mq-primary" />}
              value={dailySpending}
              onChange={setDailySpending}
              suffix="$ / day"
            />
            <NumberField
              label="Current Savings"
              icon={<SparklesIcon size={18} className="text-mq-primary" />}
              value={currentSavings}
              onChange={setCurrentSavings}
              suffix="$"
            />
          </div>

          <div className="mt-5">
            <Button
              variant="primary"
              className="w-full justify-center py-3 text-base"
              onClick={() => setRanAt(Date.now())}
            >
              Run Simulation
            </Button>
            <div className="mt-3 text-xs font-semibold text-white/55">
              Tip: adjust spending until your projections stay positive.
            </div>
          </div>
        </GlassCard>

        <div className="space-y-5">
          <motion.div
            key={ranAt ?? 'init'}
            {...(ranAt ? { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } } : {})}
          >
            <GlassCard strong className="p-5 sm:p-6 overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                    Savings Projection
                  </div>
                  <div className="text-lg font-extrabold text-mq-textPrimary">
                    Next 90 days
                  </div>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/65 ring-1 ring-white/10">
                  Daily net: <span className="text-mq-primary">{simulation.dailyNet >= 0 ? '+' : ''}${
                    Math.round(simulation.dailyNet)
                  }</span>
                </div>
              </div>

              <div className="mt-4">
                <SavingsLineChart
                  data={simulation.points.map((v) => Math.round(v * 100) / 100)}
                />
              </div>
            </GlassCard>
          </motion.div>

          {/* Prediction alert */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: ranAt ? 1 : 0,
              y: ranAt ? 0 : 12,
            }}
            transition={{ duration: 0.35 }}
          >
            {simulation.daysRemaining != null ? (
              <GlassCard className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={[
                      'mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ring-1',
                      alertTone === 'warning'
                        ? 'bg-mq-warning/10 text-mq-warning ring-mq-warning/20'
                        : 'bg-mq-gold/10 text-mq-gold ring-mq-gold/20',
                    ].join(' ')}
                  >
                    ⚠
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-extrabold text-mq-textPrimary">
                      Prediction Alert
                    </div>
                    <div className="text-sm leading-6 text-white/65">
                      At your current spending rate, your balance may run out in{' '}
                      <span className="font-extrabold text-mq-warning">
                        {clamp(simulation.daysRemaining, 0, 999)}
                      </span>{' '}
                      days.
                    </div>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-extrabold text-mq-textPrimary">Good news</div>
                    <div className="text-sm leading-6 text-white/65">
                      Your projected daily net is positive, so your savings curve should keep rising.
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard
              title="Savings after 1 Month"
              value={simulation.after1Month}
              positiveLabel="Green signal: staying on track"
            />
            <ResultCard
              title="Savings after 1 Year"
              value={simulation.after1Year}
              positiveLabel="Green signal: compounding momentum"
            />
            <ResultCard
              title="Savings after 5 Years"
              value={simulation.after5Years}
              positiveLabel="Green signal: long-term growth potential"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function NumberField({
  label,
  icon,
  value,
  onChange,
  suffix,
}: {
  label: string
  icon: ReactNode
  value: number
  onChange: (n: number) => void
  suffix: string
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          {label}
        </div>
        <div className="text-[11px] font-semibold text-white/50">{suffix}</div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-mq-primary/30">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20">
          {icon}
        </div>
        <input
          className="w-full bg-transparent text-base font-extrabold text-mq-textPrimary outline-none"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const next = Number(e.target.value)
            if (!Number.isFinite(next)) return
            onChange(next)
          }}
        />
      </div>
    </label>
  )
}

function ResultCard({
  title,
  value,
  positiveLabel,
}: {
  title: string
  value: number
  positiveLabel: string
}) {
  const positive = value >= 0
  return (
    <GlassCard
      className={[
        'p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5',
        positive
          ? 'ring-1 ring-mq-primary/20'
          : 'ring-1 ring-mq-warning/20',
      ].join(' ')}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
        {title}
      </div>
      <div className="mt-2 text-2xl font-extrabold text-mq-textPrimary tabular-nums">
        <span className={positive ? 'text-mq-primary' : 'text-mq-warning'}>
          {value >= 0 ? '$' : '-$'}
        </span>
        {Math.abs(Math.round(value)).toLocaleString('en-US')}
      </div>
      <div className="mt-2 text-sm leading-6 text-white/65">
        {positive ? positiveLabel : 'Red warning: spending may be too high.'}
      </div>
    </GlassCard>
  )
}

