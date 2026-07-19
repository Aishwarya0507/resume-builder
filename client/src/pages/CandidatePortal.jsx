import DashboardLayout from '../components/DashboardLayout'
import { Link } from 'react-router-dom'
import { UserRound, FilePlus2, ScanSearch, Briefcase, BrainCircuit, LayoutTemplate, ArrowRight } from 'lucide-react'
const tools=[
 [FilePlus2,'Build Resume','Create a professional resume from guided sections.','/dashboard/create'],
 [LayoutTemplate,'ATS Templates','Choose from 15 recruiter-friendly templates.','/dashboard/templates'],
 [ScanSearch,'ATS & Skill Match','Upload resume and JD to view score and gaps.','/dashboard/analyze'],
 [Briefcase,'Matching Jobs','Rank demo jobs using extracted resume skills.','/dashboard/jobs'],
 [BrainCircuit,'Interview Practice','Generate questions from your resume and JD.','/dashboard/interview']
]
export default function CandidatePortal(){return <DashboardLayout><div className="max-w-6xl mx-auto space-y-6 pb-10"><div><h1 className="font-display font-bold text-2xl text-text flex items-center gap-2"><UserRound className="text-accent"/>Candidate Portal</h1><p className="text-sm text-muted mt-1">Everything a candidate needs from resume creation to interview preparation.</p></div><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{tools.map(([Icon,title,desc,path])=><Link to={path} key={title} className="card-hover p-6 group"><div className="w-11 h-11 rounded-xl bg-accent/15 text-accent-light flex items-center justify-center"><Icon/></div><h2 className="font-bold text-text mt-4">{title}</h2><p className="text-sm text-muted mt-2 min-h-10">{desc}</p><span className="text-sm text-accent-light font-semibold flex items-center gap-1 mt-5 group-hover:gap-2 transition-all">Open tool <ArrowRight size={14}/></span></Link>)}</div></div></DashboardLayout>}
