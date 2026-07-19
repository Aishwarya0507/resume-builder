import React from 'react';
import ContactLink from '../ContactLink';

export default function CorporateTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-zinc-900 p-12 min-h-[1056px] w-[816px] mx-auto shadow-sm font-sans" id="resume-document">
      {/* Header */}
      <header className="flex justify-between items-center border-b-2 border-zinc-900 pb-10 mb-10">
        <div className="max-w-[60%]">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">{personalInfo.summary}</p>
        </div>
        <div className="text-right text-xs font-bold text-zinc-400 space-y-1 uppercase tracking-widest">
          <p><ContactLink type="email" value={personalInfo.email} /></p>
          <p><ContactLink type="phone" value={personalInfo.phone} /></p>
          {personalInfo.city && <p>{personalInfo.city}, {personalInfo.country}</p>}
          <p className="text-zinc-900"><ContactLink type="url" value={personalInfo.linkedin} /></p>
          <p className="text-zinc-900"><ContactLink type="url" value={personalInfo.portfolio} /></p>
        </div>
      </header>


      <div className="space-y-10">
        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-300 mb-6 border-b border-zinc-100 pb-2">Experience</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-6">
                  <div className="col-span-3">
                    <span className="text-xs font-black text-zinc-400 uppercase tracking-tighter">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-lg font-bold text-zinc-900 leading-none mb-1">{exp.title}</h3>
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">{exp.company}</div>
                    <div className="text-sm text-zinc-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-300 mb-6 border-b border-zinc-100 pb-2">Projects</h2>
            <div className="grid grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">{proj.name}</h3>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{proj.technologies}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12 pt-4">
          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-300 mb-6 border-b border-zinc-100 pb-2">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-bold text-zinc-900">{edu.degree}</h3>
                    <p className="text-xs text-zinc-600 font-medium">{edu.school}</p>
                    <p className="text-xs font-black text-zinc-300 uppercase mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-300 mb-6 border-b border-zinc-100 pb-2">Skills</h2>
            <div className="space-y-6">
              {skills.technical.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2">Technical Expertise</h4>
                  <p className="text-xs text-zinc-700 leading-relaxed font-medium">{skills.technical.join(' / ')}</p>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2">Core Competencies</h4>
                  <p className="text-xs text-zinc-700 leading-relaxed font-medium">{skills.soft.join(' / ')}</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
