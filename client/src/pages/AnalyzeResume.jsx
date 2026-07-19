import { useRef, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Upload, FileText, Cpu, BarChart3, CheckCircle, AlertTriangle, XCircle, TrendingUp, Target, RotateCcw, Lightbulb } from 'lucide-react'
import { analyzeResumeText } from '../utils/resumeAnalysis'
import { calculateMatch } from '../utils/talentEngine'

const typeStyles = {
  success: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-400',
  warning: 'border-amber-500/25 bg-amber-500/8 text-amber-400',
  error: 'border-rose-500/25 bg-rose-500/8 text-rose-400',
}
const icons = { success: CheckCircle, warning: AlertTriangle, error: XCircle }
const categoryIcons = [Target, FileText, BarChart3, CheckCircle, TrendingUp]
const barColor = (score) => score >= 80 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-500' : 'bg-rose-500'

async function extractFileText(file) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (extension === 'txt') return file.text()
  if (extension === 'docx') {
    const mammoth = await import('mammoth/mammoth.browser')
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
    return result.value
  }
  if (extension === 'pdf') {
    const pdfjs = await import('pdfjs-dist')
    const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default
    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
    const pages = []
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber)
      const content = await page.getTextContent()
      pages.push(content.items.map((item) => item.str).join(' '))
    }
    return pages.join('\n')
  }
  throw new Error('Please upload a PDF, DOCX, or TXT file.')
}

export default function AnalyzeResume() {
  const inputRef = useRef(null)
  const jdInputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [resumeText, setResumeText] = useState(localStorage.getItem('uploadedResumeText') || '')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDescription, setJobDescription] = useState(localStorage.getItem('jobDescriptionText') || '')
  const [jdFileName, setJdFileName] = useState('')
  const [dragging, setDragging] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const chooseFile = async (selectedFile) => {
    if (!selectedFile) return
    if (selectedFile.size > 10 * 1024 * 1024) return setError('File must be smaller than 10MB.')
    setError('')
    setFile(selectedFile)
    try {
      const text = await extractFileText(selectedFile)
      if (!text.trim()) throw new Error('No readable text was found in this file. Use a text-based PDF or DOCX.')
      setResumeText(text)
      localStorage.setItem('uploadedResumeText', text)
      localStorage.setItem('uploadedResumeName', selectedFile.name)
    } catch (err) {
      setFile(null)
      setResumeText('')
      setError(err.message || 'Could not read the uploaded file.')
    }
  }

  const chooseJobDescription = async (selectedFile) => {
    if (!selectedFile) return
    try {
      const text = await extractFileText(selectedFile)
      setJobDescription(text)
      setJdFileName(selectedFile.name)
      localStorage.setItem('jobDescriptionText', text)
    } catch (err) {
      setError(err.message || 'Could not read the job description file.')
    }
  }

  const handleAnalyze = () => {
    if (!resumeText.trim()) return setError('Upload a resume first.')
    setAnalyzing(true)
    setError('')
    setTimeout(() => {
      const analysis = analyzeResumeText(resumeText, `${jobTitle} ${company} ${jobDescription}`)
      analysis.skillMatch = calculateMatch(resumeText, jobDescription)
      setResult(analysis)
      localStorage.setItem('jobDescriptionText', jobDescription)
      localStorage.setItem('latestAtsAnalysis', JSON.stringify(analysis))
      setAnalyzing(false)
    }, 500)
  }

  const reset = () => {
    setResult(null); setFile(null); setResumeText(''); setError('')
    localStorage.removeItem('uploadedResumeText'); localStorage.removeItem('uploadedResumeName'); localStorage.removeItem('latestAtsAnalysis')
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 pb-10">
        <div className="flex items-start justify-between gap-4">
          <div><h1 className="font-display font-bold text-2xl text-text">ATS Resume Analyzer</h1><p className="text-sm text-muted mt-1">Upload your real resume and receive a rule-based ATS score without an API key.</p></div>
          {(file || resumeText) && <button onClick={reset} className="btn-secondary flex items-center gap-2"><RotateCcw size={15}/>Reset</button>}
        </div>
        {error && <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-400">{error}</div>}

        {!result ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 space-y-5">
            <h2 className="font-display font-semibold text-text flex items-center gap-2"><Upload size={16} className="text-accent-light"/>Upload Resume</h2>
            <input ref={inputRef} className="hidden" type="file" accept=".pdf,.docx,.txt" onChange={(e) => chooseFile(e.target.files?.[0])}/>
            <div onDragOver={(e)=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={(e)=>{e.preventDefault();setDragging(false);chooseFile(e.dataTransfer.files?.[0])}} onClick={()=>inputRef.current?.click()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragging?'border-accent bg-accent/10':resumeText?'border-emerald-500/50 bg-emerald-500/8':'border-border/60 hover:border-accent/40'}`}>
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto"><FileText size={24} className="text-accent-light"/></div>
              <p className="font-display font-semibold text-text mt-3">{file?.name || localStorage.getItem('uploadedResumeName') || 'Drop your resume here'}</p>
              <p className="text-xs text-muted mt-1">PDF, DOCX or TXT up to 10MB</p>
              {resumeText && <p className="text-xs text-emerald-400 mt-2">Resume text extracted successfully</p>}
            </div>
          </div>
          <div className="card p-6 space-y-5">
            <h2 className="font-display font-semibold text-text flex items-center gap-2"><Target size={16} className="text-accent-light"/>Target Job</h2>
            <input value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} placeholder="Job title, e.g. Software Developer" className="input-field"/>
            <input value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Company (optional)" className="input-field"/>
            <input ref={jdInputRef} className="hidden" type="file" accept=".pdf,.docx,.txt" onChange={(e)=>chooseJobDescription(e.target.files?.[0])}/><button type="button" onClick={()=>jdInputRef.current?.click()} className="btn-secondary w-full flex items-center justify-center gap-2 py-2"><Upload size={15}/>Upload JD {jdFileName&&`— ${jdFileName}`}</button><textarea value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} rows={6} placeholder="Paste the job description for keyword matching. You can also analyze without it." className="input-field resize-none"/>
            <button onClick={handleAnalyze} disabled={!resumeText || analyzing} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">{analyzing?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Analyzing...</>:<><Cpu size={16}/>Check ATS Score</>}</button>
          </div>
        </div> : <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card border-accent/20 bg-accent/5 p-6 flex flex-col items-center justify-center text-center"><div className="text-5xl font-bold text-text">{result.overall}</div><div className="text-sm text-muted mt-1">Overall ATS Score</div><div className="text-xs text-accent-light mt-3">{result.overall>=80?'Excellent match':result.overall>=65?'Good, needs improvements':'Needs improvement'}</div></div>
            <div className="lg:col-span-2 card p-6 space-y-4">{result.categories.map((category,index)=>{const Icon=categoryIcons[index];return <div key={category.label}><div className="flex items-center justify-between text-sm mb-2"><span className="flex items-center gap-2 text-text"><Icon size={14}/>{category.label}</span><b>{category.score}%</b></div><div className="h-2 rounded bg-border/40"><div className={`h-2 rounded ${barColor(category.score)}`} style={{width:`${category.score}%`}}/></div></div>})}</div>
          </div>
          {result.skillMatch&&<div className="card p-6"><h2 className="font-display font-semibold text-text mb-4">Skill Matching</h2><div className="grid md:grid-cols-2 gap-5"><div><p className="text-xs font-semibold text-emerald-400 mb-2">Matched skills</p><div className="flex flex-wrap gap-2">{result.skillMatch.matched.length?result.skillMatch.matched.map(s=><span key={s} className="badge border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">{s}</span>):<span className="text-sm text-muted">No JD skills detected yet.</span>}</div></div><div><p className="text-xs font-semibold text-amber-400 mb-2">Missing skills</p><div className="flex flex-wrap gap-2">{result.skillMatch.missing.length?result.skillMatch.missing.map(s=><span key={s} className="badge border border-amber-500/30 bg-amber-500/10 text-amber-400">{s}</span>):<span className="text-sm text-muted">No major skill gaps detected.</span>}</div></div></div></div>}<div className="card p-6"><h2 className="font-display font-semibold text-text mb-4">Actionable Suggestions</h2><div className="space-y-3">{result.suggestions.map((suggestion,index)=>{const Icon=icons[suggestion.type]||Lightbulb;return <div key={index} className={`border rounded-xl p-3 flex gap-3 ${typeStyles[suggestion.type]}`}><Icon size={17} className="shrink-0 mt-0.5"/><span className="text-sm">{suggestion.text}</span></div>})}</div></div>
          <div className="flex gap-3"><button onClick={()=>setResult(null)} className="btn-secondary">Analyze Again</button><a href="/dashboard/jobs" className="btn-primary">View Matching Jobs</a></div>
        </div>}
      </div>
    </DashboardLayout>
  )
}
