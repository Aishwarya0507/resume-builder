import React from 'react';
import ContactLink from '../ContactLink';

export default function TechProTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-slate-950 text-slate-300 p-10 min-h-[1056px] w-[816px] mx-auto font-mono" id="resume-document">
      {/* Header */}
      <header className="border-b border-emerald-500/30 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">
              {personalInfo.firstName}_{personalInfo.lastName}()
            </h1>
            <div className="text-[10px] space-y-1 text-slate-400">
              <p>// <ContactLink type="email" value={personalInfo.email} /></p>
              <p>// <ContactLink type="phone" value={personalInfo.phone} /></p>
              <p>// {personalInfo.city}, {personalInfo.country}</p>
            </div>
          </div>
          <div className="text-right space-y-1">
            {personalInfo.linkedin && <p className="text-[10px] text-emerald-500/70">link: <ContactLink type="url" value={personalInfo.linkedin} /></p>}
            {personalInfo.portfolio && <p className="text-[10px] text-emerald-500/70">src: <ContactLink type="url" value={personalInfo.portfolio} /></p>}
          </div>
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8 bg-slate-900/50 p-4 border-l-2 border-emerald-500">
          <h2 className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-tighter">01. system_overview</h2>
          <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7 space-y-8">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-emerald-500 mb-4 uppercase tracking-tighter">02. execution_history</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l border-slate-800">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-emerald-500" />
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-slate-100">{exp.title}</h3>
                      <span className="text-[10px] text-slate-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-xs text-emerald-500/70 mb-2">@ {exp.company}</div>
                    <div className="text-[11px] leading-relaxed whitespace-pre-line text-slate-400">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-emerald-500 mb-4 uppercase tracking-tighter">03. projects.git</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-900/30 p-3 rounded border border-slate-800">
                    <h3 className="text-xs font-bold text-slate-100 mb-1">{proj.name}</h3>
                    <p className="text-[10px] text-emerald-500/50 mb-2 font-bold">{proj.technologies}</p>
                    <p className="text-[10px] text-slate-400">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-5 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-bold text-emerald-500 mb-4 uppercase tracking-tighter">04. stack_config</h2>
            <div className="space-y-4">
              {skills.technical.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">_tech</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map(s => <span key={s} className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] border border-emerald-500/20">{s}</span>)}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">_soft</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map(s => <span key={s} className="px-1.5 py-0.5 bg-slate-800 text-slate-400 text-[9px]">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-emerald-500 mb-4 uppercase tracking-tighter">05. education_base</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[10px]">
                    <h3 className="font-bold text-slate-200">{edu.degree}</h3>
                    <p className="text-slate-500">{edu.school}</p>
                    <p className="text-emerald-500/50 mt-1">{edu.graduationYear} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certs & Awards */}
          {(certifications?.length > 0 || achievements?.length > 0) && (
            <section>
              <h2 className="text-xs font-bold text-emerald-500 mb-4 uppercase tracking-tighter">06. certs_awards</h2>
              <div className="space-y-3">
                {certifications?.map((cert) => (
                  <div key={cert.id} className="text-[10px]">
                    <span className="text-slate-100 font-bold block">{cert.name}</span>
                    <span className="text-slate-500">{cert.issuer}</span>
                  </div>
                ))}
                {achievements?.map((ach) => (
                  <div key={ach.id} className="text-[10px]">
                    <span className="text-emerald-500/70 font-bold block">{ach.title}</span>
                    <span className="text-slate-500">{ach.description}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
