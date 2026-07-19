import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Users, Upload, Search, Trophy, FileText, CheckCircle2 } from 'lucide-react'
import { calculateMatch, extractSkills } from '../utils/talentEngine'

const demoCandidates=[
 {name:'Ananya Reddy',role:'Full Stack Developer',text:'React Node.js Express MongoDB JavaScript REST APIs Git SQL Azure'},
 {name:'Rahul Verma',role:'Software Engineer',text:'Java Data Structures Algorithms SQL Spring Git REST APIs'},
 {name:'Meera Shah',role:'Data Analyst',text:'SQL Excel Python Data Analytics Power BI Azure SQL'},
 {name:'Vikram Rao',role:'Frontend Developer',text:'HTML CSS JavaScript React TypeScript Git'},
 {name:'Sneha Iyer',role:'Cloud Developer',text:'C# Azure Azure SQL Docker Kubernetes REST APIs'}
]

export default function RecruiterPortal(){
 const [jd,setJd]=useState('Looking for a full stack developer with React, Node.js, Express, MongoDB, SQL, Git, REST APIs and Azure knowledge.')
 const [query,setQuery]=useState('')
 const candidates=useMemo(()=>demoCandidates.map(c=>({...c,...calculateMatch(c.text,jd),skills:extractSkills(c.text)})).filter(c=>`${c.name} ${c.role}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>b.score-a.score),[jd,query])
 return <DashboardLayout><div className="max-w-6xl mx-auto space-y-6 pb-10">
  <div><h1 className="font-display font-bold text-2xl text-text flex items-center gap-2"><Users className="text-accent"/>Recruiter Portal</h1><p className="text-sm text-muted mt-1">Upload a job description, parse candidate skills, and rank applicants by job fit.</p></div>
  <div className="grid lg:grid-cols-3 gap-5"><div className="lg:col-span-2 card p-6"><label className="font-semibold text-text flex items-center gap-2 mb-3"><FileText size={16}/>Job description</label><textarea value={jd} onChange={e=>setJd(e.target.value)} className="input-field min-h-36"/></div><div className="card p-6 flex flex-col justify-center"><Upload className="text-accent mb-3"/><h3 className="font-bold text-text">Candidate batch upload</h3><p className="text-xs text-muted mt-2">Portfolio demo uses sample candidates. Connect Azure Blob Storage for production CV batches.</p><button className="btn-secondary mt-4" onClick={()=>alert('Demo mode: Azure Blob Storage connector can be enabled with deployment credentials.')}>Upload resumes</button></div></div>
  <div className="card p-4 flex items-center gap-3"><Search size={18} className="text-muted"/><input className="bg-transparent outline-none flex-1 text-text" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search candidate or target role"/></div>
  <div className="space-y-4">{candidates.map((c,i)=><div key={c.name} className="card p-5 grid md:grid-cols-[1fr_auto] gap-5"><div><div className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-accent/15 text-accent-light flex items-center justify-center font-bold">{i+1}</span><div><h2 className="font-bold text-text">{c.name}</h2><p className="text-xs text-muted">{c.role}</p></div>{i===0&&<span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20"><Trophy size={11}/>Top candidate</span>}</div><div className="flex flex-wrap gap-2 mt-4">{c.skills.map(s=><span key={s} className={`text-xs px-2 py-1 rounded-full border ${c.matched.includes(s)?'border-emerald-500/30 text-emerald-400 bg-emerald-500/10':'border-border text-muted'}`}><CheckCircle2 size={10} className="inline mr-1"/>{s}</span>)}</div></div><div className="flex items-center gap-4"><div className="text-center"><div className="text-3xl font-bold gradient-text">{c.score}%</div><p className="text-[10px] text-muted">match score</p></div><button className="btn-primary py-2 px-4" onClick={()=>alert(`Candidate profile: ${c.name}\nMatched skills: ${c.matched.join(', ')}`)}>Review</button></div></div>)}</div>
 </div></DashboardLayout>
}
