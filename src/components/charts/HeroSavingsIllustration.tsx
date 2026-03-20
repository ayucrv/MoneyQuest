import { motion } from 'framer-motion'
import { SavingsLineChart } from './SavingsLineChart'

export function HeroSavingsIllustration() {
  // A “friendly” growth curve for the hero; used only for illustration.
  const data = [100, 112, 124, 138, 153, 170, 188, 208, 230, 254, 280, 308]
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-mq-primary/25 via-mq-purple/10 to-mq-gold/20 blur-2xl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />
      <GlassBlock />
      <div className="relative rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between pb-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Projected balance
            </div>
            <div className="mt-1 text-sm font-extrabold text-mq-textPrimary">
              Growing savings
            </div>
          </div>
          <div className="rounded-full bg-mq-primary/10 px-3 py-1 text-[11px] font-semibold text-mq-primary">
            +$208
          </div>
        </div>
        <SavingsLineChart data={data} width={520} height={200} />
      </div>
    </div>
  )
}

function GlassBlock() {
  return (
    <motion.div
      className="h-2 w-2 rounded-full bg-mq-primary shadow-[0_0_0_8px_rgba(16,185,129,0.15)]"
      style={{ filter: 'blur(0.1px)' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    />
  )
}

