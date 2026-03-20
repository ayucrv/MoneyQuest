import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/learn', label: 'Learn' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/dashboard', label: 'Dashboard' },
]

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-xl px-2 py-1"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mq-primary/12 ring-1 ring-mq-primary/25">
            <span className="text-lg font-extrabold text-mq-primary">MQ</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold text-mq-textPrimary">
              MoneyQuest
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Financial Future Simulator
            </div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'text-mq-textPrimary bg-mq-primary/10 ring-1 ring-mq-primary/20'
                    : 'text-white/65 hover:bg-white/5',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-mq-textPrimary shadow-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-mq-primary/40 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="text-lg">{open ? '×' : '≡'}</span>
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden lg:hidden"
      >
        <div className="mx-auto max-w-6xl px-4 pb-3 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  [
                    'block rounded-xl px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-mq-primary/10 text-mq-textPrimary ring-1 ring-mq-primary/15'
                      : 'text-white/70 hover:bg-white/5',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  )
}

