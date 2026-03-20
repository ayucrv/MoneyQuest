import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '../components/fintech/GlassCard'
import { BookOpenIcon } from '../components/icons/FinIcons'
import { Button } from '../components/fintech/Button'

const enterUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.55 },
}

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

type Lesson = {
  id: string
  title: string
  difficulty: Difficulty
  progress: number // 0..100
  minutes: number
  keyInsight: string
  content: string[]
}

const DIFFICULTY_TONE: Record<Difficulty, { tagClass: string; accent: string }> = {
  Beginner: { tagClass: 'bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20', accent: 'mq-primary' },
  Intermediate: { tagClass: 'bg-mq-gold/10 text-mq-gold ring-1 ring-mq-gold/20', accent: 'mq-gold' },
  Advanced: { tagClass: 'bg-mq-purple/10 text-mq-purple ring-1 ring-mq-purple/20', accent: 'mq-purple' },
}

export function Learn() {
  const lessons = useMemo<Lesson[]>(
    () => [
      {
        id: 'budget-basics',
        title: 'Budgeting Basics for Real Life',
        difficulty: 'Beginner',
        progress: 35,
        minutes: 6,
        keyInsight:
          'A budget is not restriction—it is a plan for your future self.',
        content: [
          'Start with needs, then add wants.',
          'Track daily spending and adjust weekly.',
          'Small changes compound over time.',
        ],
      },
      {
        id: 'emergency-fund',
        title: 'Emergency Funds: Stay Ready',
        difficulty: 'Intermediate',
        progress: 18,
        minutes: 7,
        keyInsight:
          'An emergency fund protects momentum when surprises happen.',
        content: [
          'Aim for 3–6 months of essentials.',
          'Keep it accessible, not risky.',
          'Practice with MoneyQuest missions.',
        ],
      },
      {
        id: 'risk-and-return',
        title: 'Risk vs. Return (Simple)',
        difficulty: 'Advanced',
        progress: 5,
        minutes: 8,
        keyInsight:
          'Higher returns usually come with higher uncertainty—understand both.',
        content: [
          'Think in ranges, not guarantees.',
          'Diversify your decisions.',
          'Use simulations to learn safely.',
        ],
      },
    ],
    []
  )

  const [activeId, setActiveId] = useState<string | null>(lessons[0]?.id ?? null)
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0]

  return (
    <main className="mq-section py-8 sm:py-10">
      <motion.div {...enterUp} className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mq-pill">
            <BookOpenIcon size={16} className="text-mq-primary" />
            Learn & Grow
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-mq-textPrimary sm:text-3xl">
            Lessons built for beginners
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Open a lesson to see key insights, short explanations, and guided practice prompts.
          </p>
        </div>
      </motion.div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">
        <div className="space-y-4">
          {lessons.map((l) => {
            const tone = DIFFICULTY_TONE[l.difficulty]
            const isActive = l.id === activeId
            return (
              <motion.button
                key={l.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22 }}
                onClick={() => setActiveId(l.id)}
                className="w-full text-left"
              >
                <GlassCard
                  strong={isActive}
                  className={[
                    'p-5 transition-all duration-300',
                    isActive ? '' : 'hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="text-sm font-extrabold text-mq-textPrimary">{l.title}</div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tone.tagClass}`}>
                          {l.difficulty}
                        </span>
                        <span className="text-[11px] font-semibold text-white/55">
                          {l.minutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-white/55">
                      <span>Progress</span>
                      <span>{l.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${l.progress}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-mq-primary to-mq-purple"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.button>
            )
          })}
        </div>

        <GlassCard strong className="p-6 sm:p-7">
          <motion.div {...enterUp}>
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                <div className="text-sm font-extrabold text-mq-textPrimary">Now learning</div>
                <div className="text-xl font-extrabold tracking-tight text-mq-textPrimary">
                  {active.title}
                </div>
              </div>
              <Button
                variant="secondary"
                className="hidden md:inline-flex"
                onClick={() => setActiveId(active.id)}
              >
                Mark as opened
              </Button>
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Key Insight
              </div>
              <div className="mt-2 text-sm font-extrabold text-mq-textPrimary">
                {active.keyInsight}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {active.content.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75"
                >
                  {p}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs font-semibold text-white/55">
                Next step: apply this in a simulator mission.
              </div>
              <Button
                variant="primary"
                className="justify-center px-7"
                onClick={() => (window.location.href = '/simulator')}
              >
                Try the Simulator →
              </Button>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </main>
  )
}

