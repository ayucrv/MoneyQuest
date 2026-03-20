import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'

export function Layout() {
  return (
    <div className="mq-shell">
      <div className="mq-bg-visual">
        <div className="mq-bg-grid" />
      </div>
      <TopNav />
      <div className="relative z-10">
        <Outlet />
        <footer className="border-t border-white/10 bg-white/3 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs font-semibold text-white/60 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} MoneyQuest. All rights reserved.</span>
            <div className="flex gap-4">
              <a className="hover:text-white" href="#">
                Privacy
              </a>
              <a className="hover:text-white" href="#">
                Terms
              </a>
              <a className="hover:text-white" href="#">
                Contact
              </a>
            </div>
          </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

