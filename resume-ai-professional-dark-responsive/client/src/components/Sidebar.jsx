import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Zap, LayoutDashboard, FilePlus2, ScanSearch, Briefcase,
  Settings, HelpCircle, LogOut, ChevronRight, Star, BrainCircuit, Users, BarChart3, Cloud, UserRound
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  {
    label: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: UserRound, label: 'Candidate Portal', path: '/dashboard/candidate' },
    ]
  },
  {
    label: 'Resume Tools',
    items: [
      { icon: FilePlus2, label: 'Create Resume', path: '/dashboard/create', badge: 'New' },
      { icon: ScanSearch, label: 'Analyze Resume', path: '/dashboard/analyze', badge: 'AI' },
      { icon: Briefcase, label: 'Job Matches', path: '/dashboard/jobs' },
      { icon: BrainCircuit, label: 'Interview Generator', path: '/dashboard/interview', badge: 'AI' },
    ]
  },
  {
    label: 'Recruiter Tools',
    items: [
      { icon: Users, label: 'Recruiter Portal', path: '/dashboard/recruiter' },
      { icon: BarChart3, label: 'Hiring Analytics', path: '/dashboard/analytics' },
      { icon: Cloud, label: 'Microsoft Cloud', path: '/dashboard/microsoft' },
    ]
  },
  {
    label: 'Account',
    items: [
      { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
      { icon: HelpCircle, label: 'Help & Support', path: '/dashboard/help' },
    ]
  }
]

const badgeColors = {
  New: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  AI: 'bg-accent/15 text-accent-light border-accent/25',
}

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-surface border-r border-border/60 z-50
          flex flex-col transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border/60 gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-accent-sm">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-lg text-text tracking-tight">
            Resume<span className="gradient-text">AI</span>
          </span>
        </div>

        {/* Pro upgrade banner */}
        <div className="mx-3 mt-4 p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/10 border border-accent/20 cursor-pointer hover:border-accent/40 transition-colors group">
          <div className="flex items-center gap-2 mb-1">
            <Star size={13} className="text-accent-light" fill="currentColor" />
            <span className="text-xs font-display font-semibold text-accent-light">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-text-dim leading-relaxed">Unlock unlimited AI resume generation and analytics.</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-accent font-display font-semibold group-hover:gap-2 transition-all">
            Upgrade Now <ChevronRight size={12} />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navItems.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] font-display font-semibold text-muted uppercase tracking-widest px-4 mb-1.5">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(({ icon: Icon, label, path, badge }) => {
                  const isActive = location.pathname === path
                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setOpen(false)}
                      className={isActive ? 'nav-link-active' : 'nav-link'}
                    >
                      <Icon size={17} className={isActive ? 'text-accent-light' : ''} />
                      <span className="flex-1">{label}</span>
                      {badge && (
                        <span className={`badge border text-[10px] px-2 py-0.5 ${badgeColors[badge]}`}>
                          {badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-border/60 shrink-0">
          <div 
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
            onClick={handleLogout}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white text-xs font-display font-bold shrink-0 uppercase">
              {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-display font-semibold text-text truncate">{user?.firstName || 'User'} {user?.lastName || ''}</p>
              <p className="text-xs text-muted truncate">{user?.email || 'user@example.com'}</p>
            </div>
            <LogOut size={15} className="text-muted group-hover:text-rose-400 transition-colors shrink-0" />
          </div>
        </div>
      </aside>
    </>
  )
}
