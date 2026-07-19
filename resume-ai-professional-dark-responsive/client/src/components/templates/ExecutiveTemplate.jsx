import React from 'react';
import ContactLink from '../ContactLink';

export default function ExecutiveTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-slate-900 p-12 min-h-[1056px] w-[816px] mx-auto font-sans" id="resume-document">
      {/* Header */}
      <header className="border-b-4 border-slate-800 pb-8 mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
          {personalInfo.firstName} <span className="text-slate-500">{personalInfo.lastName}</span>
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
          <ContactLink type="email" value={personalInfo.email} />
          <ContactLink type="phone" value={personalInfo.phone} />
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          <ContactLink type="url" value={personalInfo.linkedin} />
          <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-3">Professional Profile</h2>
              <p className="text-sm leading-relaxed text-slate-700 font-medium italic">"{personalInfo.summary}"</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Executive Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                      <span className="text-xs font-black text-slate-500 uppercase">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-600 mb-2">{exp.company} | {exp.location}</div>
                    <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed ml-2 border-l-2 border-slate-100 pl-4">
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
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Key Strategic Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-md font-bold text-slate-800 mb-1">{proj.name}</h3>
                    <p className="text-xs text-slate-600 mb-2 font-bold uppercase tracking-tight">{proj.technologies}</p>
                    <p className="text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Core Competencies</h2>
            <div className="space-y-4">
              {skills.technical.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map(s => <span key={s} className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">{s}</span>)}
                  </div>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-slate-500 mb-2">Leadership</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map(s => <span key={s} className="px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Academic Background</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-600 mt-0.5">{edu.school}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Certifications</h2>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-xs">
                    <span className="font-bold block text-slate-800">{cert.name}</span>
                    <span className="text-[10px] text-slate-500">{cert.issuer} | {cert.year}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Awards & Honors</h2>
              <ul className="space-y-2">
                {achievements.map((ach) => (
                  <li key={ach.id} className="text-xs">
                    <span className="font-bold block text-slate-800">{ach.title}</span>
                    <span className="text-[10px] text-slate-500">{ach.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
