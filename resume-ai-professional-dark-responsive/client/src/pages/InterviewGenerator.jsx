import { useMemo, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { BrainCircuit, Copy, CheckCircle2, FileText } from 'lucide-react'
import { generateInterviewQuestions } from '../utils/talentEngine'

export default function InterviewGenerator(){
  const resumeText = localStorage.getItem('uploadedResumeText') || ''
  const [jd,setJd] = useState(localStorage.getItem('jobDescriptionText') || '')
  const [generated,setGenerated] = useState(false)
  const [copied,setCopied] = useState(false)
  const questions = useMemo(()=>generateInterviewQuestions(resumeText,jd),[resumeText,jd])
  const copyAll = async()=>{await navigator.clipboard.writeText(questions.map((q,i)=>`${i+1}. ${q}`).join('\n'));setCopied(true);setTimeout(()=>setCopied(false),1500)}
  return <DashboardLayout><div className="max-w-5xl mx-auto space-y-6 pb-10">
    <div><h1 className="font-display font-bold text-2xl text-text flex items-center gap-2"><BrainCircuit className="text-accent"/>Interview Question Generator</h1><p className="text-sm text-muted mt-1">Creates role-specific technical and behavioural questions using your resume and job description.</p></div>
    <div className="card p-6 space-y-4"><label className="text-sm font-semibold text-text flex items-center gap-2"><FileText size={16}/>Paste job description</label><textarea className="input-field min-h-44" value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste the role responsibilities and required skills..."/><button className="btn-primary" onClick={()=>{localStorage.setItem('jobDescriptionText',jd);setGenerated(true)}}>Generate Interview Questions</button></div>
    {generated&&<div className="card p-6"><div className="flex justify-between items-center mb-5"><h2 className="font-display font-bold text-text">Personalized Question Set</h2><button onClick={copyAll} className="btn-secondary flex items-center gap-2 py-2 px-4">{copied?<CheckCircle2 size={16}/>:<Copy size={16}/>} {copied?'Copied':'Copy all'}</button></div><div className="space-y-3">{questions.map((q,i)=><div key={q} className="p-4 rounded-xl border border-border bg-surface/40 flex gap-3"><span className="w-7 h-7 shrink-0 rounded-lg bg-accent/15 text-accent-light flex items-center justify-center text-xs font-bold">{i+1}</span><p className="text-sm text-text-dim leading-relaxed">{q}</p></div>)}</div></div>}
  </div></DashboardLayout>
}
