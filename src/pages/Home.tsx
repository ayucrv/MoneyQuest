import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Button } from '../components/fintech/Button'
import { GlassCard } from '../components/fintech/GlassCard'
import { HeroSavingsIllustration } from '../components/charts/HeroSavingsIllustration'
import { SparklesIcon, CalculatorIcon, BookOpenIcon } from '../components/icons/FinIcons'

const enterUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.55 },
}

export function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-r from-mq-primary/20 via-mq-purple/15 to-mq-gold/20 blur-3xl"
          animate={{ scale: [0.98, 1.03, 0.98], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="absolute inset-0 opacity-[0.12]">
          <div className="mq-grid-bg h-full w-full" />
        </div>
      </div>

      <section className="mq-section pt-10 pb-14 sm:pt-14 sm:pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div {...enterUp} className="space-y-5">
            <div className="mq-pill">
              <span className="h-1.5 w-1.5 rounded-full bg-mq-primary shadow-[0_0_0_5px_rgba(16,185,129,0.2)]" />
              Gamified financial future simulator
            </div>

            <h1 className="text-left text-3xl font-extrabold leading-[1.06] tracking-tight text-mq-textPrimary sm:text-4xl md:text-[48px]">
              Visualize Your Financial Future.
            </h1>

            <p className="max-w-xl text-left text-[15px] leading-6 text-white/65 sm:text-base">
              MoneyQuest turns money concepts into interactive missions, quizzes, and simulations—so
              beginners build confidence through practice, not guesswork.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                className="px-7"
                onClick={() => (window.location.href = '/simulator')}
              >
                Start Simulation
              </Button>
              <Button
                variant="secondary"
                className="px-7"
                onClick={() => (window.location.href = '/learn')}
              >
                Explore Lessons
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 pt-4">
              <GlassCard className="p-4" strong={false}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Avg. quiz completion
                </div>
                <div className="mt-2 text-2xl font-extrabold text-mq-textPrimary">
                  93%
                </div>
              </GlassCard>
              <GlassCard className="p-4" strong={false}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Savings confidence
                </div>
                <div className="mt-2 text-2xl font-extrabold text-mq-primary">
                  4.8/5
                </div>
              </GlassCard>
              <GlassCard className="p-4" strong={false}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Learning missions
                </div>
                <div className="mt-2 text-2xl font-extrabold text-mq-textPrimary">
                  1,200+
                </div>
              </GlassCard>
            </div>
          </motion.div>

          <motion.div {...enterUp} transition={{ ...enterUp.transition, delay: 0.08 }}>
            <HeroSavingsIllustration />
          </motion.div>
        </div>
      </section>

      <section className="mq-section pb-10 sm:pb-14">
        <div className="flex items-end justify-between gap-6">
          <motion.div {...enterUp} className="space-y-2">
            <div className="mq-pill">Build habits with guided practice</div>
            <h2 className="text-left text-2xl font-extrabold tracking-tight text-mq-textPrimary sm:text-3xl">
              Everything you need to learn money—step by step.
            </h2>
          </motion.div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<SparklesIcon />}
            title="Financial Future Simulator"
            description="Test different income and spending scenarios to see how your balance could grow."
          />
          <FeatureCard
            icon={<CalculatorIcon />}
            title="Spending Predictor"
            description="Get instant projections and smart warnings when your spending rate is too high."
          />
          <FeatureCard
            icon={<BookOpenIcon />}
            title="Gamified Learning"
            description="Quizzes and lessons unlock badges as you master budgeting, saving, and risk basics."
          />
        </div>
      </section>

      <section className="mq-section pb-16">
        <motion.div {...enterUp} className="mx-auto max-w-4xl">
          <GlassCard strong className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.12)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Ready to build momentum?
                </div>
                <div className="text-left text-2xl font-extrabold text-mq-textPrimary">
                  Start today. Learn by doing.
                </div>
                <p className="max-w-2xl text-left text-sm leading-6 text-white/65">
                  Launch your first simulation, then unlock lessons and quizzes that reinforce the skills you
                  used to make the decision.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="primary" className="justify-center px-7">
                  Start Simulation
                </Button>
                <Button
                  variant="ghost"
                  className="px-6"
                  onClick={() => (window.location.href = '/quiz')}
                >
                  Try a Quick Quiz
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="group"
    >
      <GlassCard className="h-full p-5 transition-all duration-300 group-hover:shadow-[0_26px_90px_rgba(15,23,42,0.12)]">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mq-primary/10 text-mq-primary ring-1 ring-mq-primary/20 transition-all duration-300 group-hover:bg-mq-primary/15">
            {icon}
          </div>
          <div>
            <div className="text-sm font-extrabold text-mq-textPrimary">{title}</div>
            <p className="mt-2 text-sm leading-6 text-white/65">{description}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

