import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X, ChevronRight, Bell, Search, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const publicLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
]

export default function Navbar({ sidebarOpen, setSidebarOpen, isDashboard = false }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMenu = () => setMobileOpen(false)

  if (isDashboard) {
    return (
      <header className="h-16 border-b border-border/60 bg-bg/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-text transition-colors"
            aria-label="Toggle dashboard navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-text-dim font-body">ResumeAI</span>
            <ChevronRight size={14} className="text-muted" />
            <span className="text-text font-display font-medium capitalize">
              {location.pathname.split('/').pop() || 'Dashboard'}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 bg-surface border border-border/60 rounded-xl px-4 py-2 w-64 focus-within:border-accent/50 transition-colors">
          <Search size={15} className="text-muted" />
          <input type="text" placeholder="Search resumes..." className="bg-transparent text-sm text-text placeholder-muted focus:outline-none w-full font-body" />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-white/5 text-text-dim hover:text-text transition-colors" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-xs font-display font-bold uppercase">
            {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
          </div>
        </div>
      </header>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-3">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-slate-950/75 backdrop-blur-2xl shadow-2xl shadow-black/25">
        <div className="h-16 px-4 sm:px-5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={closeMenu}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Zap size={17} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              Resume<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {publicLinks.map((item) => (
              <a key={item.label} href={item.href} className="nav-public-link">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 ml-auto lg:ml-0">
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary text-sm py-2.5 px-5">Dashboard</Link>
                <button onClick={logout} className="btn-ghost text-sm inline-flex items-center gap-2"><LogOut size={15} /> Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">Sign In</Link>
                <Link to="/signup" className="btn-primary text-sm py-2.5 px-5">Get Started</Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="lg:hidden ml-auto p-2.5 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle main navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 p-3 sm:p-4 animate-menu-in">
            <div className="grid gap-1">
              {publicLinks.map((item) => (
                <a key={item.label} href={item.href} onClick={closeMenu} className="mobile-nav-link">{item.label}</a>
              ))}
            </div>
            <div className="sm:hidden grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu} className="btn-primary text-center text-sm py-3">Dashboard</Link>
                  <button onClick={() => { logout(); closeMenu() }} className="btn-secondary text-sm py-3">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="btn-secondary text-center text-sm py-3">Sign In</Link>
                  <Link to="/signup" onClick={closeMenu} className="btn-primary text-center text-sm py-3">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
