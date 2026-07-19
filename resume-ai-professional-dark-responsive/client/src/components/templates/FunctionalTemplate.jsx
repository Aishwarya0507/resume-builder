import React from 'react';
import ContactLink from '../ContactLink';

export default function FunctionalTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-zinc-800 p-12 min-h-[1056px] w-[816px] mx-auto shadow-sm font-sans" id="resume-document">
      {/* Header */}
      <header className="text-center mb-12 border-b-4 border-zinc-900 pb-8">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
          <ContactLink type="email" value={personalInfo.email} />
          {personalInfo.phone && <span>· <ContactLink type="phone" value={personalInfo.phone} /></span>}
          {personalInfo.city && <span>· {personalInfo.city}, {personalInfo.country}</span>}
          <ContactLink type="url" value={personalInfo.linkedin} />
          <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 border-b border-zinc-100 pb-1">Executive Summary</h2>
          <p className="text-sm leading-relaxed text-zinc-600">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills - Prioritized in Functional Resume */}
      <section className="mb-12">
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-6 border-b border-zinc-100 pb-1">Core Competencies</h2>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          {skills.technical.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-[0.2em]">Technical Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {skills.technical.map(s => <span key={s} className="px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded">{s}</span>)}
              </div>
            </div>
          )}
          {skills.soft.length > 0 && (
            <div>
              <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2 tracking-[0.2em]">Key Professional Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.soft.map(s => <span key={s} className="px-2 py-1 bg-zinc-100 text-zinc-800 text-[10px] font-bold rounded">{s}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Experience - Simplified in Functional Resume */}
      {experience && experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-6 border-b border-zinc-100 pb-1">Work History</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-zinc-900">{exp.company}</span>
                  <span className="text-xs text-zinc-400 mx-3">—</span>
                  <span className="text-xs font-medium text-zinc-600 italic">{exp.title}</span>
                </div>
                <span className="text-[10px] font-black text-zinc-300 uppercase">{exp.startDate} - {exp.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-12">
        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 border-b border-zinc-100 pb-1">Academic History</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-zinc-800">{edu.degree}</h3>
                  <p className="text-[10px] text-zinc-500">{edu.school} | {edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Awards */}
        {(certifications?.length > 0 || achievements?.length > 0) && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900 mb-4 border-b border-zinc-100 pb-1">Awards & Certifications</h2>
            <ul className="text-xs space-y-2">
              {certifications?.map((cert) => (
                <li key={cert.id} className="text-zinc-600">
                  <span className="font-bold">{cert.name}</span> <span className="text-zinc-400">· {cert.issuer}</span>
                </li>
              ))}
              {achievements?.map((ach) => (
                <li key={ach.id} className="text-zinc-600">
                  <span className="font-bold italic">{ach.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
