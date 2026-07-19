import { FileText, MoreHorizontal, Eye, Download, Trash2, Clock } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const scoreColor = (score) => {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-rose-400'
}

const scoreBarColor = (score) => {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-rose-500'
}

export default function ResumeCard({ title, role, score, lastEdited, template, id }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleAction = (label) => {
    setMenuOpen(false)
    if (label === 'Preview') {
      navigate(`/dashboard/preview/${template}`)
    }
  }

  return (
    <div className="card-hover p-5 group relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center">
            <FileText size={18} className="text-accent-light" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-text text-sm leading-tight">{title}</h3>
            <p className="text-xs text-muted mt-0.5">{role}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-muted hover:text-text transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 w-40 bg-surface border border-border/80 rounded-xl shadow-xl z-10 py-1 overflow-hidden">
              {[
                { icon: Eye, label: 'Preview' },
                { icon: Download, label: 'Download' },
                { icon: Trash2, label: 'Delete', danger: true },
              ].map(({ icon: Icon, label, danger }) => (
                <button
                  key={label}
                  onClick={() => handleAction(label)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-white/5 transition-colors ${
                    danger ? 'text-rose-400 hover:text-rose-300' : 'text-text-dim hover:text-text'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Score bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted font-body">ATS Score</span>
          <span className={`text-xs font-display font-bold ${scoreColor(score)}`}>{score}%</span>
        </div>
        <div className="h-1.5 bg-border/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/40">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Clock size={11} />
          {lastEdited}
        </div>
        <span className="badge bg-card border border-border/60 text-text-dim text-[10px]">
          {template}
        </span>
      </div>
    </div>
  )
}
