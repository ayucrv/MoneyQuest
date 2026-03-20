import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../components/fintech/GlassCard'
import { Button } from '../components/fintech/Button'
import { ConfettiBurst } from '../components/gamification/ConfettiBurst'
import { CheckIcon } from '../components/icons/FinIcons'

type Question = {
  id: string
  prompt: string
  options: string[]
  correctIndex: number
  explanation: string
}

const shake = {
  animate: {
    x: [0, -8, 8, -6, 6, 0],
  },
  transition: { duration: 0.42 },
}

export function Quiz() {
  const questions = useMemo<Question[]>(
    () => [
      {
        id: 'q1',
        prompt: 'If your goal is saving, what is the most important first step?',
        options: [
          'Increase daily spending to match your lifestyle',
          'Set a budget and track spending',
          'Ignore savings until the end of the month',
          'Invest immediately without learning basics',
        ],
        correctIndex: 1,
        explanation:
          'Budgeting helps you understand where money goes, so you can intentionally move money toward savings.',
      },
      {
        id: 'q2',
        prompt: 'An emergency fund is mainly for…',
        options: [
          'Luxury upgrades',
          'Unexpected expenses and surprises',
          'Maximizing risk for faster returns',
          'Replacing all insurance',
        ],
        correctIndex: 1,
        explanation:
          'Emergency funds protect you from financial setbacks when surprises happen.',
      },
      {
        id: 'q3',
        prompt: 'What does “risk vs. return” usually mean?',
        options: [
          'Higher returns always guarantee safety',
          'Higher returns often come with more uncertainty',
          'Lower return always beats every higher return',
          'Risk only matters for professionals',
        ],
        correctIndex: 1,
        explanation:
          'In many situations, higher potential returns are paired with higher uncertainty.',
      },
    ],
    []
  )

  const total = questions.length
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const [badgeOpen, setBadgeOpen] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)

  const done = index >= total
  const q = done ? null : questions[index]

  const progressPct = total ? ((Math.min(index, total - 1) + (done ? 1 : 0)) / total) * 100 : 0

  function answerOption(i: number) {
    if (!q || locked) return
    setSelected(i)
    const correct = i === q.correctIndex
    setIsCorrect(correct)
    setLocked(true)

    if (correct) {
      // If last question, trigger completion animation.
      if (index === total - 1) {
        window.setTimeout(() => {
          setConfettiActive(true)
          setBadgeOpen(true)
        }, 250)
      }
    } else {
      setConfettiActive(false)
    }

    window.setTimeout(() => {
      if (correct) {
        setIndex((v) => v + 1)
      } else {
        // Let them try again: unlock after showing feedback.
        setLocked(false)
        setSelected(null)
        setIsCorrect(null)
      }
    }, correct ? 900 : 750)
  }

  return (
    <main className="mq-section py-8 sm:py-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mq-pill">Quick Quiz</div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-mq-textPrimary sm:text-3xl">
            Learn by answering
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
            Pick an answer. You’ll get instant feedback, then move forward when you’re right.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs font-semibold text-white/65">
          Progress:{' '}
          <span className="text-mq-textPrimary">
            {Math.min(index + (done ? 1 : 0), total)}/{total}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-mq-primary to-mq-purple"
            initial={{ width: 0 }}
            animate={{ width: `${done ? 100 : clamp(progressPct, 0, 100)}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          <GlassCard strong className="p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20">
                      <CheckIcon size={26} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                        Quiz completed
                      </div>
                  <div className="mt-1 text-xl font-extrabold text-mq-textPrimary">
                        Badge Unlocked: First Simulation
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm leading-6 text-white/65">
                    Great job. Your learning streak just got stronger.
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button variant="primary" className="justify-center px-7" onClick={() => (window.location.href = '/dashboard')}>
                      Go to Dashboard
                    </Button>
                    <Button variant="secondary" className="justify-center px-7" onClick={() => {
                      setIndex(0)
                      setSelected(null)
                      setLocked(false)
                      setIsCorrect(null)
                      setBadgeOpen(false)
                      setConfettiActive(false)
                    }}>
                      Play Again
                    </Button>
                  </div>

                  <div className="relative mt-5 min-h-[120px]">
                    <ConfettiBurst
                      active={confettiActive && badgeOpen}
                      onDone={() => setConfettiActive(false)}
                    />
                    {badgeOpen ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mx-auto w-fit rounded-3xl bg-white/5 px-6 py-4 ring-1 ring-white/10 backdrop-blur-xl"
                      >
                        <div className="text-sm font-extrabold text-mq-textPrimary">Achievement badge</div>
                        <div className="text-xs font-semibold text-white/55">Keep going to unlock more.</div>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              ) : q ? (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isCorrect === false
                      ? { x: [0, -8, 8, -6, 6, 0] }
                      : { opacity: 1, y: 0 }
                  }
                  transition={isCorrect === false ? shake.transition : { duration: 0.35 }}
                >
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
                    Question {index + 1} of {total}
                  </div>
                  <div className="mt-2 text-xl font-extrabold tracking-tight text-mq-textPrimary">
                    {q.prompt}
                  </div>

                  <div className="mt-5 grid gap-3">
                    {q.options.map((opt, i) => {
                      const chosen = selected === i
                      const correct = i === q.correctIndex
                      const showCorrect = locked && isCorrect === true && correct
                      const showWrong = locked && isCorrect === false && chosen && !correct
                      return (
                        <motion.button
                          key={opt}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          disabled={locked}
                          onClick={() => answerOption(i)}
                          className={[
                            'rounded-3xl border p-4 text-left text-sm font-semibold transition-all duration-300',
                            'bg-white/5 backdrop-blur-xl',
                            chosen ? 'ring-1 ring-mq-primary/20' : 'ring-1 ring-white/10',
                            showCorrect ? 'border-mq-primary/40 bg-mq-primary/10 text-mq-textPrimary' : '',
                            showWrong ? 'border-mq-warning/50 bg-mq-warning/10 text-mq-textPrimary' : '',
                          ].join(' ')}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 text-white/65 ring-1 ring-white/10">
                              {String.fromCharCode(65 + i)}
                            </div>
                            <div className="flex-1">
                              <div className="leading-6">{opt}</div>
                              {locked && chosen && isCorrect === true ? (
                                <div className="mt-2 inline-flex items-center gap-2 text-[12px] font-extrabold text-mq-primary">
                                  <CheckIcon size={18} /> Correct!
                                </div>
                              ) : null}
                              {locked && chosen && isCorrect === false ? (
                                <div className="mt-2 text-[12px] font-extrabold text-mq-warning">
                                  Not quite. Try again.
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  <AnimatePresence>
                    {locked && isCorrect === false && q ? (
                      <motion.div
                        key="explain"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 rounded-3xl border border-mq-warning/20 bg-mq-warning/10 p-4"
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-mq-warning">
                          Explanation
                        </div>
                        <div className="mt-1 text-sm leading-6 text-white/75">{q.explanation}</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <GlassCard className="p-5 sm:p-6">
            <div className="text-sm font-extrabold text-mq-textPrimary">How you earn</div>
            <div className="mt-2 space-y-2 text-sm leading-6 text-white/65">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-2xl bg-mq-primary/10 ring-1 ring-mq-primary/20" />
                <div>
                  <div className="font-extrabold text-mq-textPrimary">Correct answers</div>
                  <div>Move forward and unlock progress.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-2xl bg-mq-purple/10 ring-1 ring-mq-purple/20" />
                <div>
                  <div className="font-extrabold text-mq-textPrimary">Streak momentum</div>
                  <div>Premium learning rhythm for beginners.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 rounded-2xl bg-mq-gold/10 ring-1 ring-mq-gold/20" />
                <div>
                  <div className="font-extrabold text-mq-textPrimary">Badges</div>
                  <div>Celebrate milestones with confetti.</div>
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-5 sm:p-6">
            <div className="text-sm font-extrabold text-mq-textPrimary">Next best action</div>
            <div className="mt-2 text-sm leading-6 text-white/65">
              Run a simulation after your quiz to apply the concept immediately.
            </div>
            <div className="mt-4">
              <Button
                variant="primary"
                className="w-full justify-center px-7"
                onClick={() => (window.location.href = '/simulator')}
              >
                Go to Simulator
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  )
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

