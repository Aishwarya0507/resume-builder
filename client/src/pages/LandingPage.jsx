import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Zap, ArrowRight, Star, Shield, Cpu, BarChart3, Target, FileText,
  CheckCircle, Sparkles, ChevronRight, Users, Upload, BriefcaseBusiness,
  ScanSearch, WandSparkles, LayoutTemplate, Gauge, Quote, CalendarDays,
  Clock3, BookOpen, BadgeCheck, Layers3
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const features = [
  { icon: Upload, title: 'Resume & JD Upload', desc: 'Upload your resume and job description to instantly compare skills, keywords and experience.', color: 'accent' },
  { icon: Gauge, title: 'ATS Score', desc: 'Get an explainable ATS score with section-level feedback and practical recommendations.', color: 'emerald' },
  { icon: ScanSearch, title: 'Resume Parsing', desc: 'Extract skills, education, projects and experience into a clean candidate profile.', color: 'amber' },
  { icon: BriefcaseBusiness, title: 'Job Matching', desc: 'Discover relevant roles ranked using your extracted skills and resume profile.', color: 'rose' },
  { icon: WandSparkles, title: 'Interview Generator', desc: 'Generate role-specific technical, behavioural and project interview questions.', color: 'accent' },
  { icon: BarChart3, title: 'Recruiter Analytics', desc: 'Track candidate ranking, skill demand, interview success and hiring distribution.', color: 'emerald' },
]

const templates = [
  { name: 'Modern Edge', tag: 'Technology', style: 'from-indigo-500/30 to-violet-500/5' },
  { name: 'Executive Pro', tag: 'Leadership', style: 'from-cyan-500/25 to-slate-500/5' },
  { name: 'Classic ATS', tag: 'Universal', style: 'from-emerald-500/25 to-slate-500/5' },
  { name: 'Developer One', tag: 'Engineering', style: 'from-fuchsia-500/25 to-indigo-500/5' },
]

const pricing = [
  { name: 'Starter', price: 'Free', desc: 'For students building their first professional resume.', features: ['3 resumes', 'Basic ATS scoring', '10+ templates', 'Resume upload'], featured: false },
  { name: 'Career Pro', price: '₹299', suffix: '/month', desc: 'For active job seekers who want a stronger advantage.', features: ['Unlimited resumes', 'Advanced ATS analysis', 'Job matching', 'Interview questions'], featured: true },
  { name: 'Recruiter', price: '₹999', suffix: '/month', desc: 'For teams screening and ranking candidates.', features: ['Recruiter portal', 'Candidate ranking', 'Hiring analytics', 'Team dashboard'], featured: false },
]

const posts = [
  { icon: Target, category: 'ATS Strategy', title: 'How to improve your ATS score without keyword stuffing', read: '6 min read' },
  { icon: BriefcaseBusiness, category: 'Career', title: 'The resume sections recruiters scan first', read: '4 min read' },
  { icon: Cpu, category: 'AI Hiring', title: 'How responsible AI can support better hiring decisions', read: '8 min read' },
]

const iconColorMap = {
  accent: 'bg-indigo-500/15 border-indigo-400/25 text-indigo-300',
  emerald: 'bg-emerald-500/15 border-emerald-400/25 text-emerald-300',
  amber: 'bg-amber-500/15 border-amber-400/25 text-amber-300',
  rose: 'bg-rose-500/15 border-rose-400/25 text-rose-300',
}

export default function LandingPage() {
  const { user } = useAuth()
  const ctaLink = user ? '/dashboard/create' : '/signup'

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b16] text-slate-100">
      <Navbar />

      <main>
        <section className="hero-shell relative px-4 sm:px-6 lg:px-10 pt-32 sm:pt-40 pb-20 sm:pb-28">
          <div className="hero-grid absolute inset-0 pointer-events-none" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[28rem] sm:w-[48rem] h-[22rem] bg-indigo-500/15 rounded-full blur-[110px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[1.08fr_.92fr] gap-14 lg:gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-indigo-400/25 bg-indigo-400/10 mb-7">
                <div className="glow-dot" />
                <span className="text-xs sm:text-sm font-semibold text-indigo-200">AI-powered talent intelligence platform</span>
                <ChevronRight size={14} className="text-indigo-300" />
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.04] tracking-[-0.04em] mb-6">
                Build a resume that gets
                <span className="block gradient-text mt-2">noticed, matched and hired.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300/85 max-w-2xl mx-auto lg:mx-0 mb-9 leading-relaxed">
                Create ATS-ready resumes, compare them with job descriptions, discover matching roles and prepare for interviews from one polished workspace.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-9">
                <Link to={ctaLink} className="btn-primary text-base px-7 py-4 inline-flex items-center justify-center gap-2 group">
                  Build My Resume <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#templates" className="btn-secondary text-base px-7 py-4 inline-flex items-center justify-center gap-2">
                  Explore Templates
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-slate-400">
                {['No credit card', '15 ATS templates', 'Works without API key'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><CheckCircle size={15} className="text-emerald-400" />{item}</span>
                ))}
              </div>
            </div>

            <div className="relative max-w-2xl mx-auto w-full">
              <div className="absolute -inset-5 bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-cyan-500/20 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-[1.6rem] border border-white/10 bg-slate-950/85 shadow-2xl shadow-black/40 overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 border-b border-white/10 bg-white/[0.025]">
                  <div className="flex gap-1.5"><span className="window-dot bg-rose-400" /><span className="window-dot bg-amber-400" /><span className="window-dot bg-emerald-400" /></div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono truncate">talent.resumeai.app/candidate</div>
                  <div className="w-10" />
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div><p className="text-xs text-indigo-300 font-semibold uppercase tracking-[0.18em]">Candidate overview</p><h3 className="font-display text-lg sm:text-xl font-bold text-white mt-1">Your career workspace</h3></div>
                    <span className="badge bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">Ready</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[['ATS score','92%'],['Job matches','18'],['Skills found','24']].map(([label,value]) => (
                      <div key={label} className="rounded-xl border border-white/8 bg-white/[0.035] p-3 sm:p-4">
                        <p className="text-[10px] sm:text-xs text-slate-500">{label}</p><p className="text-lg sm:text-2xl font-bold text-white mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between mb-4"><span className="text-sm font-semibold text-white">Resume strength</span><span className="text-xs text-indigo-300">Excellent</span></div>
                    <div className="h-2 rounded-full bg-white/8 overflow-hidden"><div className="h-full w-[92%] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" /></div>
                    <div className="grid sm:grid-cols-2 gap-2 mt-4">
                      {['Strong action verbs','Relevant skills','Clean formatting','Measurable impact'].map((item) => <div key={item} className="flex items-center gap-2 text-xs text-slate-400"><CheckCircle size={14} className="text-emerald-400" />{item}</div>)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-indigo-500/10 border border-indigo-400/20 p-3 flex items-center gap-3"><FileText className="text-indigo-300" size={20}/><div><p className="text-xs text-slate-400">Current resume</p><p className="text-sm text-white font-semibold">Software Engineer</p></div></div>
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-400/20 p-3 flex items-center gap-3"><BriefcaseBusiness className="text-cyan-300" size={20}/><div><p className="text-xs text-slate-400">Best match</p><p className="text-sm text-white font-semibold">Frontend Developer</p></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.015] px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[['15+','ATS templates'],['92%','Average score'],['10+','Career tools'],['2','Talent portals']].map(([value,label]) => <div key={label} className="text-center"><p className="text-2xl sm:text-3xl font-bold text-white">{value}</p><p className="text-xs sm:text-sm text-slate-500 mt-1">{label}</p></div>)}
          </div>
        </section>

        <section id="features" className="section-pad scroll-mt-28">
          <div className="section-container">
            <SectionHeading eyebrow="Platform features" title="Everything needed for smarter hiring" desc="Built for candidates who want better opportunities and recruiters who want clearer, faster decisions." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {features.map(({ icon: Icon, title, desc, color }) => (
                <article key={title} className="premium-card group p-5 sm:p-6">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-1 ${iconColorMap[color]}`}><Icon size={20}/></div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3><p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="section-pad scroll-mt-28 bg-white/[0.015] border-y border-white/8">
          <div className="section-container">
            <SectionHeading eyebrow="ATS templates" title="Professional layouts for every career path" desc="Choose from 15 clean, ATS-friendly templates designed to remain readable, modern and recruiter-ready." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {templates.map((template, index) => (
                <article key={template.name} className="group premium-card overflow-hidden">
                  <div className={`aspect-[4/5] bg-gradient-to-br ${template.style} p-5 border-b border-white/8`}>
                    <div className="h-full rounded-lg bg-slate-100 shadow-xl p-4 text-slate-800 transform group-hover:-translate-y-1 transition-transform duration-300">
                      <div className="h-2.5 w-20 bg-slate-800 rounded mb-2"/><div className="h-1.5 w-28 bg-slate-300 rounded mb-5"/>
                      <div className="grid grid-cols-[.32fr_1fr] gap-3 h-[75%]"><div className="bg-slate-200 rounded"/><div className="space-y-3">{[1,2,3,4].map((x)=><div key={x}><div className="h-1.5 w-14 bg-slate-500 rounded mb-1.5"/><div className="h-1 bg-slate-200 rounded mb-1"/><div className="h-1 bg-slate-200 rounded w-4/5"/></div>)}</div></div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between"><div><h3 className="font-semibold text-white">{template.name}</h3><p className="text-xs text-slate-500 mt-1">{template.tag}</p></div><span className="text-xs text-indigo-300">ATS ready</span></div>
                </article>
              ))}
            </div>
            <div className="text-center mt-10"><Link to={user ? '/dashboard/templates' : '/signup'} className="btn-secondary inline-flex items-center gap-2">View all 15 templates <ArrowRight size={17}/></Link></div>
          </div>
        </section>

        <section id="pricing" className="section-pad scroll-mt-28">
          <div className="section-container">
            <SectionHeading eyebrow="Simple pricing" title="Start free. Upgrade when you are ready." desc="Transparent plans for candidates, career builders and hiring teams." />
            <div className="grid lg:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
              {pricing.map((plan) => (
                <article key={plan.name} className={`premium-card p-6 sm:p-7 relative ${plan.featured ? 'border-indigo-400/40 shadow-indigo-500/10 shadow-2xl lg:-translate-y-3' : ''}`}>
                  {plan.featured && <span className="absolute top-4 right-4 badge bg-indigo-500 text-white">Most popular</span>}
                  <p className="text-sm font-semibold text-indigo-300">{plan.name}</p>
                  <div className="mt-4 flex items-end gap-1"><span className="text-4xl font-bold text-white">{plan.price}</span>{plan.suffix && <span className="text-sm text-slate-500 mb-1">{plan.suffix}</span>}</div>
                  <p className="text-sm text-slate-400 mt-3 min-h-[42px]">{plan.desc}</p>
                  <div className="my-6 h-px bg-white/8" />
                  <div className="space-y-3">{plan.features.map((feature)=><div key={feature} className="flex items-center gap-2.5 text-sm text-slate-300"><CheckCircle size={16} className="text-emerald-400"/>{feature}</div>)}</div>
                  <Link to={ctaLink} className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} mt-7 w-full text-center block`}>{plan.price === 'Free' ? 'Start free' : 'Choose plan'}</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="section-pad scroll-mt-28 bg-white/[0.015] border-y border-white/8">
          <div className="section-container">
            <SectionHeading eyebrow="Career insights" title="Practical advice for your next opportunity" desc="Short, useful guides on resumes, ATS systems, interviews and responsible hiring technology." />
            <div className="grid md:grid-cols-3 gap-5">
              {posts.map(({icon:Icon,category,title,read}) => (
                <article key={title} className="premium-card p-6 flex flex-col min-h-[240px] group">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-300 mb-6"><Icon size={20}/></div>
                  <p className="text-xs uppercase tracking-[0.16em] text-indigo-300 font-semibold">{category}</p>
                  <h3 className="font-display text-xl text-white font-semibold mt-3 leading-snug group-hover:text-indigo-200 transition-colors">{title}</h3>
                  <div className="mt-auto pt-6 flex items-center justify-between text-xs text-slate-500"><span className="flex items-center gap-1.5"><Clock3 size={14}/>{read}</span><ArrowRight size={16}/></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-[2rem] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 via-slate-950 to-cyan-500/10 px-6 py-12 sm:px-10 sm:py-16 text-center shadow-2xl shadow-indigo-950/30">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="relative z-10 max-w-3xl mx-auto"><div className="inline-flex items-center gap-2 badge bg-white/5 border border-white/10 text-indigo-200 mb-6"><BadgeCheck size={15}/>Built for ambitious careers</div><h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">Turn your experience into your next opportunity.</h2><p className="text-slate-300 mt-5 max-w-2xl mx-auto">Create, analyse and improve your resume with a complete talent platform that works beautifully on every device.</p><Link to={ctaLink} className="btn-primary inline-flex items-center gap-2 mt-8 px-8 py-4">Get started free <ArrowRight size={18}/></Link></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center"><Zap size={15} className="text-white" fill="white"/></div><span className="font-bold text-white">ResumeAI</span></div>
          <p className="text-xs sm:text-sm text-slate-500 text-center">© 2026 ResumeAI Talent Platform. Built for candidates and recruiters.</p>
          <div className="flex items-center gap-5 text-sm text-slate-500"><a href="#features" className="hover:text-white">Features</a><a href="#pricing" className="hover:text-white">Pricing</a><a href="#blog" className="hover:text-white">Blog</a></div>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.035] mb-5"><Sparkles size={14} className="text-indigo-300"/><span className="text-xs sm:text-sm font-semibold text-slate-300">{eyebrow}</span></div>
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-[-0.035em] leading-tight">{title}</h2>
      <p className="text-sm sm:text-lg text-slate-400 mt-4 leading-relaxed">{desc}</p>
    </div>
  )
}
