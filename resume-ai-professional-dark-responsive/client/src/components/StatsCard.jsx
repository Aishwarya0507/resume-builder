import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ icon: Icon, label, value, change, changeType, color = 'accent' }) {
  const colorMap = {
    accent: 'from-accent/20 to-accent-dark/10 border-accent/20 text-accent-light',
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/20 text-amber-400',
    rose: 'from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-400',
  }

  const iconBg = colorMap[color] || colorMap.accent

  return (
    <div className="card-hover p-5 group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br border flex items-center justify-center ${iconBg}`}>
          <Icon size={20} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-display font-semibold ${changeType === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {changeType === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {change}
          </div>
        )}
      </div>
      <p className="text-2xl font-display font-bold text-text mb-1">{value}</p>
      <p className="text-xs font-body text-muted">{label}</p>
    </div>
  )
}
