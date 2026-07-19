import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import DashboardLayout from '../components/DashboardLayout'
import StatsCard from '../components/StatsCard'
import ResumeCard from '../components/ResumeCard'
import {
  FileText, BarChart3, Briefcase, TrendingUp,
  Plus, ArrowRight, Cpu, Clock, ChevronRight, Loader2
} from 'lucide-react'

const stats = [
  { icon: FileText, label: 'Total Resumes', value: '4', change: '+2 this week', changeType: 'up', color: 'accent' },
  { icon: BarChart3, label: 'Avg. ATS Score', value: '86%', change: '+4% vs last month', changeType: 'up', color: 'emerald' },
  { icon: Briefcase, label: 'Jobs Applied', value: '23', change: '+7 this week', changeType: 'up', color: 'amber' },
  { icon: TrendingUp, label: 'Interview Rate', value: '34%', change: '+11% vs avg', changeType: 'up', color: 'rose' },
]

const recentActivity = [
  { icon: FileText, action: 'Resume updated', detail: 'Software Engineer resume', time: '2h ago', color: 'accent' },
  { icon: Cpu, action: 'AI Analysis complete', detail: '91% ATS score achieved', time: '2h ago', color: 'emerald' },
  { icon: Briefcase, action: 'Applied to Google', detail: 'Senior Frontend Engineer', time: '5h ago', color: 'amber' },
  { icon: BarChart3, action: 'Score improved', detail: '+8% on Full Stack resume', time: 'Yesterday', color: 'rose' },
]

const activityColor = {
  accent: 'bg-accent/15 text-accent-light',
  emerald: 'bg-emerald-500/15 text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-400',
  rose: 'bg-rose-500/15 text-rose-400',
}

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get('/api/resumes');
        if (response.data.success) {
          // Format data for ResumeCard if needed
          const formattedResumes = response.data.data.map(r => ({
            id: r._id,
            title: r.title || 'Untitled Resume',
            role: r.personalInfo?.summary ? 'Custom Resume' : 'New Resume',
            score: r.atsScore?.overall || 0,
            lastEdited: new Date(r.updatedAt).toLocaleDateString(),
            template: r.template || 'Modern'
          }));
          setResumes(formattedResumes);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-text">Welcome back 👋</h1>
            <p className="text-sm text-muted mt-1 font-body">Here's what's happening with your resumes today.</p>
          </div>
          <Link to="/dashboard/create" className="btn-primary text-sm flex items-center gap-2 self-start sm:self-auto">
            <Plus size={16} />
            New Resume
          </Link>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Plus, label: 'Create New Resume', desc: 'Build with AI', to: '/dashboard/create', accent: true },
            { icon: Cpu, label: 'Analyze Resume', desc: 'Get ATS score', to: '/dashboard/analyze' },
            { icon: Briefcase, label: 'Browse Jobs', desc: 'Matched for you', to: '/dashboard/jobs' },
          ].map(({ icon: Icon, label, desc, to, accent }) => (
            <Link
              key={label}
              to={to}
              className={`card-hover p-5 flex items-center gap-4 group ${accent ? 'border-accent/30 bg-accent/5' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                accent ? 'bg-accent text-white shadow-accent-sm' : 'bg-card border border-border text-text-dim'
              }`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-text text-sm">{label}</p>
                <p className="text-xs text-muted">{desc}</p>
              </div>
              <ArrowRight size={16} className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Resumes + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Resumes */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="section-title text-base">My Resumes</h2>
              <Link to="/dashboard/create" className="text-xs text-accent hover:text-accent-light flex items-center gap-1 font-display font-medium transition-colors">
                View all <ChevronRight size={13} />
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 size={24} className="animate-spin text-accent" />
              </div>
            ) : resumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} {...resume} />
                ))}

              </div>
            ) : (
              <div className="text-center py-10 border border-border/60 rounded-xl bg-card">
                <p className="text-sm text-muted">You haven't created any resumes yet.</p>
                <Link to="/dashboard/create" className="btn-primary inline-flex mt-4 text-xs">Create your first resume</Link>
              </div>
            )}
          </div>

          {/* Activity feed */}
          <div className="space-y-4">
            <h2 className="section-title text-base">Recent Activity</h2>
            <div className="card p-4 space-y-1">
              {recentActivity.map(({ icon: Icon, action, detail, time, color }, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors group cursor-default">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${activityColor[color]}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-display font-medium text-text leading-tight">{action}</p>
                    <p className="text-xs text-muted truncate mt-0.5">{detail}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock size={11} className="text-muted" />
                    <span className="text-[11px] text-muted whitespace-nowrap">{time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Tip card */}
            <div className="card border-accent/20 p-4 bg-accent/5">
              <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-accent-light" />
                <span className="text-xs font-display font-semibold text-accent-light">AI Tip</span>
              </div>
              <p className="text-sm text-text-dim font-body leading-relaxed">
                Your resume is missing quantified achievements. Adding metrics can boost your ATS score by up to 15%.
              </p>
              <Link to="/dashboard/create" className="mt-3 text-xs text-accent font-display font-semibold flex items-center gap-1 hover:gap-2 transition-all inline-flex">
                Fix it now <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
