import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useResume } from '../context/ResumeContext'
import {
  User, Briefcase, GraduationCap, Code2, 
  ChevronRight, ChevronLeft, Check, Cpu, Sparkles, Plus, X, Loader2,
  FolderKanban, ScrollText, Trophy
} from 'lucide-react'
import api from '../api/axios'

const steps = [
  { icon: User, label: 'Personal', id: 'personal' },
  { icon: Briefcase, label: 'Experience', id: 'experience' },
  { icon: GraduationCap, label: 'Education', id: 'education' },
  { icon: FolderKanban, label: 'Projects & Skills', id: 'projects-skills' },
  { icon: ScrollText, label: 'Certs & Awards', id: 'certs-awards' },
]

export default function CreateResume() {
  console.log("CreateResume component rendering...");
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const {
    resumeData,
    updatePersonalInfo,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    addCertification, updateCertification, removeCertification,
    addAchievement, updateAchievement, removeAchievement,
    addSkill, removeSkill,
    setResumeData,
    saveResume
  } = useResume()

  const [skillInput, setSkillInput] = useState({
    technical: '',
    soft: '',
    languages: '',
    tools: ''
  })

  const [isSaving, setIsSaving] = useState(false)
  const [aiLoading, setAiLoading] = useState({
    summary: false,
    bullet: null,
    skills: false,
    autoFix: false
  })


  const [notification, setNotification] = useState({ type: '', message: '' })

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: '' }), 5000)
  }

  const handleGenerateSummary = async () => {
    if (aiLoading.summary) return;
    setAiLoading(prev => ({ ...prev, summary: true }))
    try {
      const role = resumeData.experience[0]?.title || 'Professional';
      const skillsList = [...resumeData.skills.technical, ...resumeData.skills.soft];
      
      const response = await api.post('/api/ai/generate-summary', {
        title: role,
        company: resumeData.experience[0]?.company || '',
        skills: skillsList,
      });
      if (response.data.success) {
        updatePersonalInfo('summary', response.data.data);
        showNotification('success', 'AI Summary generated!')
      }
    } catch (error) {
      showNotification('error', "AI service temporarily unavailable");
    } finally {
      setAiLoading(prev => ({ ...prev, summary: false }))
    }
  }

  const handleAutoFix = async () => {
    window.alert("AutoFix Initiated");
    console.log("AutoFix Clicked");
    if (aiLoading.autoFix) return;
    setAiLoading(prev => ({ ...prev, autoFix: true }))
    console.log("Auto-Fix started with data:", resumeData);
    
    try {
      showNotification('success', 'Improving your resume with AI...');
      const response = await api.post('/api/ai/auto-fix', {
        resumeData: resumeData
      });
      
      console.log("Auto-Fix API response:", response.data);
      
      if (response.data.success) {
        setResumeData(response.data.data);
        showNotification('success', response.data.message || 'Resume improved successfully!');
      }
    } catch (error) {
      console.error("Auto-Fix API error:", error);
      showNotification('error', "Auto-fix failed. Please try again.");
      
      // Step 6: Fallback Logic
      const role = resumeData.experience[0]?.title || '[role]';
      const skills = resumeData.skills.technical.slice(0, 3).join(', ') || '[skills]';
      const fallbackSummary = `Motivated ${role} with skills in ${skills}, seeking opportunities to contribute and grow.`;
      
      updatePersonalInfo('summary', fallbackSummary);
    } finally {
      setAiLoading(prev => ({ ...prev, autoFix: false }))
    }
  }

  const handleImproveBullet = async (expId, currentText) => {
    if (!currentText || aiLoading.bullet === expId) return;
    setAiLoading(prev => ({ ...prev, bullet: expId }))
    try {
      const response = await api.post('/api/ai/improve-bullet', {
        text: currentText,
        role: resumeData.experience.find(e => e.id === expId)?.title
      });
      if (response.data.success) {
        updateExperience(expId, 'description', response.data.data);
        showNotification('success', 'Bullet point improved!')
      }
    } catch (error) {
      showNotification('error', "Failed to improve bullet point");
    } finally {
      setAiLoading(prev => ({ ...prev, bullet: null }))
    }
  }

  const handleSaveAndContinue = async () => {
    if (isSaving) return;
    setIsSaving(true)
    try {
      const result = await saveResume();
      if (result.success) {
        showNotification('success', 'Data saved successfully!')
        navigate('/dashboard/templates')
      }
    } catch (error) {
      showNotification('error', "Failed to save resume data.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSkillKeyDown = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(category, skillInput[category]);
      setSkillInput(prev => ({ ...prev, [category]: '' }));
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        {/* Notification */}
        {notification.message && (
          <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300 ${
            notification.type === 'error' 
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            <span className="text-sm font-display font-medium">{notification.message}</span>
            <button onClick={() => setNotification({ type: '', message: '' })} className="ml-2 hover:opacity-70">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl text-text">Resume Details</h1>
            <p className="text-sm text-muted mt-1 font-body">Fill in your information to generate a professional resume.</p>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-xs font-display font-bold text-accent px-3 py-1 bg-accent/10 rounded-full border border-accent/20">Step {currentStep + 1} of 5</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="card p-6 overflow-x-auto">
          <div className="flex items-center justify-between relative min-w-[500px] px-8">
            <div className="absolute left-16 right-16 top-6 h-0.5 bg-border/40 z-0" />
            <div
              className="absolute left-16 top-6 h-0.5 bg-accent z-0 transition-all duration-500"
              style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 2rem)` }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon
              const isCompleted = i < currentStep
              const isCurrent = i === currentStep

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className="flex flex-col items-center gap-2 z-10 group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-accent border-accent text-white'
                      : isCurrent
                      ? 'bg-accent/10 border-accent text-accent shadow-accent-sm'
                      : 'bg-surface border-border text-muted group-hover:border-accent/40'
                  }`}>
                    {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <span className={`text-[10px] font-display font-bold uppercase tracking-wider transition-colors ${
                    isCurrent ? 'text-accent' : isCompleted ? 'text-text-dim' : 'text-muted'
                  }`}>
                    {step.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 0 && (
            <div className="card p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-xl text-text">Personal Details</h2>
                </div>
                <button 
                  onClick={handleAutoFix}
                  disabled={aiLoading.autoFix}
                  className="btn-primary py-2 px-6 flex items-center gap-2 group shadow-accent"
                >
                  {aiLoading.autoFix ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />}
                  <span className="font-bold">Auto-Fix with AI</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: 'First Name', field: 'firstName', placeholder: 'John' },
                  { label: 'Last Name', field: 'lastName', placeholder: 'Doe' },
                  { label: 'Email Address', field: 'email', placeholder: 'john@example.com' },
                  { label: 'Phone Number', field: 'phone', placeholder: '+1 (555) 000-0000' },
                  { label: 'LinkedIn URL', field: 'linkedin', placeholder: 'linkedin.com/in/johndoe' },
                  { label: 'Portfolio / Website', field: 'portfolio', placeholder: 'johndoe.dev' },
                  { label: 'City', field: 'city', placeholder: 'San Francisco' },
                  { label: 'Country', field: 'country', placeholder: 'United States' },
                ].map(({ label, field, placeholder }) => (
                  <div key={label} className="space-y-1.5">
                    <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">{label}</label>
                    <input 
                      type="text" 
                      value={resumeData.personalInfo[field]}
                      onChange={(e) => updatePersonalInfo(field, e.target.value)}
                      placeholder={placeholder} 
                      className="input-field py-3 px-4" 
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">Professional Summary</label>
                <textarea
                  rows={5}
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Summarize your professional journey..."
                  className="input-field resize-none p-4"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-muted font-display font-medium">{resumeData.personalInfo.summary.length} / 600 characters</span>
                  <button 
                    onClick={handleGenerateSummary}
                    disabled={aiLoading.summary}
                    className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-2 group transition-all"
                  >
                    {aiLoading.summary ? <Loader2 size={12} className="animate-spin" /> : <Cpu size={12} className="group-hover:rotate-12 transition-transform" />}
                    {aiLoading.summary ? 'AI is thinking...' : 'Generate with AI'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 1 && (
            <div className="card p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Briefcase size={20} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-text">Work History</h2>
                </div>
                <button onClick={addExperience} className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                  <Plus size={14} /> Add Role
                </button>
              </div>

              {resumeData.experience.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-border/40 rounded-2xl">
                  <p className="text-muted text-sm font-body">No experience added yet. Click "Add Role" to start.</p>
                </div>
              )}

              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="card bg-surface/30 p-6 space-y-6 relative group border border-border/40 hover:border-accent/30 transition-all">
                  <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 p-2 rounded-xl text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-all">
                    <X size={16} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Job Title', field: 'title', placeholder: 'Senior Software Engineer' },
                      { label: 'Company', field: 'company', placeholder: 'Google' },
                      { label: 'Location', field: 'location', placeholder: 'Mountain View, CA' },
                      { label: 'Duration', field: 'startDate', placeholder: 'Jan 2022 - Present' },
                    ].map(({ label, field, placeholder }) => (
                      <div key={label} className="space-y-1.5">
                        <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">{label}</label>
                        <input 
                          type="text" 
                          value={exp[field]}
                          onChange={(e) => updateExperience(exp.id, field, e.target.value)}
                          placeholder={placeholder} 
                          className="input-field" 
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">Responsibilities</label>
                    <textarea 
                      rows={3} 
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="input-field resize-none p-4" 
                    />
                    <button 
                      onClick={() => handleImproveBullet(exp.id, exp.description)}
                      disabled={aiLoading.bullet === exp.id}
                      className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-2 mt-2"
                    >
                      {aiLoading.bullet === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} 
                      AI Optimize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Education */}
          {currentStep === 2 && (
            <div className="card p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <GraduationCap size={20} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-text">Education</h2>
                </div>
                <button onClick={addEducation} className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                  <Plus size={14} /> Add Degree
                </button>
              </div>

              {resumeData.education.map((edu) => (
                <div key={edu.id} className="card bg-surface/30 p-6 space-y-6 relative border border-border/40">
                  <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 p-2 rounded-xl text-muted hover:text-rose-400 transition-all">
                    <X size={16} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Degree', field: 'degree', placeholder: 'Bachelor of Science' },
                      { label: 'Field', field: 'field', placeholder: 'Computer Science' },
                      { label: 'School', field: 'school', placeholder: 'Stanford' },
                      { label: 'Graduation Year', field: 'graduationYear', placeholder: '2021' },
                    ].map(({ label, field, placeholder }) => (
                      <div key={label} className="space-y-1.5">
                        <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">{label}</label>
                        <input 
                          type="text" 
                          value={edu[field]}
                          onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                          placeholder={placeholder} 
                          className="input-field" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Projects & Skills */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <FolderKanban size={20} />
                    </div>
                    <h2 className="font-display font-bold text-xl text-text">Projects</h2>
                  </div>
                  <button onClick={addProject} className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                    <Plus size={14} /> Add Project
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="card bg-surface/30 p-6 space-y-4 border border-border/40 relative">
                      <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 p-2 rounded-xl text-muted hover:text-rose-400 transition-all">
                        <X size={16} />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} className="input-field" placeholder="Project Name" />
                        <input type="text" value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} className="input-field" placeholder="Tech Stack" />
                      </div>
                      <textarea rows={2} value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} className="input-field resize-none p-3" placeholder="Project details..." />
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-8 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Code2 size={20} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-text">Skills & Expertise</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {['technical', 'soft'].map((id) => (
                    <div key={id} className="space-y-4">
                      <label className="block text-xs font-display font-bold text-text-dim uppercase tracking-wider">{id} Skills</label>
                      <div className="flex flex-wrap gap-2 p-4 border border-border/40 rounded-2xl min-h-[100px] bg-surface/50 transition-all focus-within:border-accent/40">
                        {resumeData.skills[id].map((skill) => (
                          <span key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent text-white text-xs font-display font-bold shadow-accent-sm">
                            {skill}
                            <X size={12} onClick={() => removeSkill(id, skill)} className="cursor-pointer hover:scale-125 transition-transform" />
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="Type & press Enter"
                          value={skillInput[id]}
                          onChange={(e) => setSkillInput(prev => ({...prev, [id]: e.target.value}))}
                          onKeyDown={(e) => handleSkillKeyDown(e, id)}
                          className="bg-transparent text-sm text-text placeholder-muted focus:outline-none flex-1 min-w-[120px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Certs & Awards */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <ScrollText size={20} />
                    </div>
                    <h2 className="font-display font-bold text-xl text-text">Certifications</h2>
                  </div>
                  <button onClick={addCertification} className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                    <Plus size={14} /> Add Cert
                  </button>
                </div>
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="card bg-surface/30 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-border/40 relative">
                    <button onClick={() => removeCertification(cert.id)} className="absolute top-4 right-4 p-1 text-muted hover:text-rose-400">
                      <X size={16} />
                    </button>
                    <input type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)} className="input-field" placeholder="AWS Architect" />
                    <input type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)} className="input-field" placeholder="Amazon" />
                    <input type="text" value={cert.year} onChange={(e) => updateCertification(cert.id, 'year', e.target.value)} className="input-field" placeholder="2023" />
                  </div>
                ))}
              </div>

              <div className="card p-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                      <Trophy size={20} />
                    </div>
                    <h2 className="font-display font-bold text-xl text-text">Achievements</h2>
                  </div>
                  <button onClick={addAchievement} className="btn-primary text-xs py-2 px-4 flex items-center gap-2">
                    <Plus size={14} /> Add Award
                  </button>
                </div>
                {resumeData.achievements.map((ach) => (
                  <div key={ach.id} className="card bg-surface/30 p-6 space-y-4 border border-border/40 relative">
                    <button onClick={() => removeAchievement(ach.id)} className="absolute top-4 right-4 p-1 text-muted hover:text-rose-400">
                      <X size={16} />
                    </button>
                    <input type="text" value={ach.title} onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)} className="input-field" placeholder="Hackathon Winner" />
                    <textarea rows={2} value={ach.description} onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)} className="input-field resize-none p-3" placeholder="Describe the achievement..." />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border/40">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="btn-secondary py-3 px-6 text-sm flex items-center gap-2 disabled:opacity-40"
          >
            <ChevronLeft size={18} /> Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="btn-primary py-3 px-8 text-sm flex items-center gap-2"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSaveAndContinue}
              disabled={isSaving}
              className="btn-primary py-3 px-10 text-sm flex items-center gap-3 shadow-accent"
            >
              {isSaving ? (
                <><Loader2 size={18} className="animate-spin" /> Saving Data...</>
              ) : (
                <><Sparkles size={18} /> Save & Continue</>
              )}
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
