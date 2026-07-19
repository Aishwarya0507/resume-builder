import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Briefcase, MapPin, Building2, CheckCircle, Search, Upload } from 'lucide-react'
import { scoreJobMatch } from '../utils/resumeAnalysis'
import { Link } from 'react-router-dom'

const jobs = [
  { title:'Software Developer Intern', company:'TechNova', location:'Hyderabad / Hybrid', type:'Internship', skills:['Java','JavaScript','SQL','Git','Data Structures','REST APIs'] },
  { title:'Full Stack Developer Intern', company:'CodeCraft Labs', location:'Bengaluru / Remote', type:'Internship', skills:['React.js','Node.js','Express.js','MongoDB','HTML','CSS','JavaScript'] },
  { title:'Java Developer Intern', company:'NextGen Systems', location:'Hyderabad', type:'Internship', skills:['Java','OOP','SQL','Spring','REST APIs','Git'] },
  { title:'Frontend Developer Intern', company:'PixelWorks', location:'Remote', type:'Internship', skills:['HTML','CSS','JavaScript','React.js','Responsive Design','Git'] },
  { title:'Backend Developer Intern', company:'CloudAxis', location:'Pune / Hybrid', type:'Internship', skills:['Node.js','Express.js','SQL','MongoDB','REST APIs','Authentication'] },
  { title:'Associate Software Engineer', company:'InnoByte', location:'Chennai', type:'Full-time', skills:['Java','Python','Data Structures','Algorithms','SQL','Testing'] },
  { title:'Graduate Engineer Trainee', company:'DigitalSphere', location:'Hyderabad', type:'Full-time', skills:['Java','C++','SQL','Problem Solving','Communication','Git'] },
  { title:'Web Developer Intern', company:'WebNest', location:'Remote', type:'Internship', skills:['HTML','CSS','JavaScript','React.js','Node.js','Git'] },
  { title:'QA Automation Intern', company:'QualityLoop', location:'Bengaluru', type:'Internship', skills:['Testing','Java','Selenium','SQL','Debugging','Git'] },
  { title:'Data Analyst Intern', company:'InsightGrid', location:'Remote', type:'Internship', skills:['SQL','Excel','Python','Data Analysis','Power BI','Communication'] },
  { title:'React Developer Intern', company:'UIForge', location:'Hyderabad / Hybrid', type:'Internship', skills:['React.js','JavaScript','HTML','CSS','REST APIs','Git'] },
  { title:'Junior Node.js Developer', company:'ServerStack', location:'Bengaluru', type:'Full-time', skills:['Node.js','Express.js','MongoDB','REST APIs','JWT','Git'] },
]

export default function JobRecommendations() {
  const resumeText = localStorage.getItem('uploadedResumeText') || ''
  const [query, setQuery] = useState('')
  const ranked = useMemo(() => jobs.map(job=>({...job,...scoreJobMatch(resumeText,job)})).filter(job=>`${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.score-a.score),[resumeText,query])
  return <DashboardLayout><div className="max-w-6xl mx-auto space-y-6 pb-10">
    <div><h1 className="font-display font-bold text-2xl text-text">Matching Jobs</h1><p className="text-sm text-muted mt-1">Jobs are ranked by skills found in your uploaded resume. These are demo listings for portfolio functionality, not live vacancies.</p></div>
    {!resumeText && <div className="card p-8 text-center"><Upload className="mx-auto text-accent"/><h2 className="text-lg font-bold text-text mt-3">Upload your resume first</h2><p className="text-sm text-muted mt-1">The app needs resume text to calculate job-match percentages.</p><Link to="/dashboard/analyze" className="btn-primary inline-flex mt-4">Upload Resume</Link></div>}
    {resumeText && <><div className="card p-4 flex items-center gap-3"><Search size={18} className="text-muted"/><input value={query} onChange={e=>setQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-text" placeholder="Search title, company, or location"/></div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{ranked.map((job,index)=><div key={`${job.company}-${job.title}`} className="card p-5 space-y-4"><div className="flex justify-between gap-3"><div><div className="flex items-center gap-2"><Briefcase size={17} className="text-accent"/><h2 className="font-display font-bold text-text">{job.title}</h2></div><p className="text-sm text-muted flex items-center gap-1 mt-2"><Building2 size={13}/>{job.company}</p><p className="text-xs text-muted flex items-center gap-1 mt-1"><MapPin size={13}/>{job.location} · {job.type}</p></div><div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold ${job.score>=70?'border-emerald-500 text-emerald-400':job.score>=45?'border-amber-500 text-amber-400':'border-rose-500 text-rose-400'}`}>{job.score}%</div></div><div><p className="text-xs font-semibold text-text-dim mb-2">Required skills</p><div className="flex flex-wrap gap-2">{job.skills.map(skill=><span key={skill} className={`text-xs px-2 py-1 rounded-full border ${job.matched.includes(skill.toLowerCase())?'border-emerald-500/30 bg-emerald-500/10 text-emerald-400':'border-border text-muted'}`}>{job.matched.includes(skill.toLowerCase())&&<CheckCircle size={10} className="inline mr-1"/>}{skill}</span>)}</div></div><button className="btn-secondary w-full" onClick={()=>alert('Demo listing: connect a live jobs API or employer URL before production deployment.')}>{index===0?'Best Match — View Details':'View Details'}</button></div>)}</div></>}
  </div></DashboardLayout>
}
