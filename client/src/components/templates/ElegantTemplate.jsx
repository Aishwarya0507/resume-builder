import React from 'react';
import ContactLink from '../ContactLink';

export default function ElegantTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-[#fdfcfb] text-gray-800 p-16 min-h-[1056px] w-[816px] mx-auto shadow-sm font-serif" id="resume-document">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-[0.1em] uppercase">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="h-[1px] w-24 bg-gray-300 mx-auto mb-6" />
        <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
          <ContactLink type="email" value={personalInfo.email} />
          <ContactLink type="phone" value={personalInfo.phone} />
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          <ContactLink type="url" value={personalInfo.linkedin} />
          <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      <div className="space-y-12">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="max-w-2xl mx-auto text-center">
            <p className="text-sm leading-relaxed italic text-gray-600">"{personalInfo.summary}"</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-center mb-10">Professional Background</h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-medium text-gray-900 italic">{exp.title}</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">{exp.company} | {exp.location}</div>
                  <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed max-w-2xl mx-auto pl-8 border-l border-gray-100">
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
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 text-center mb-10">Notable Projects</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 italic">{proj.name}</h3>
                  <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">{proj.technologies}</p>
                  <p className="text-[11px] text-gray-600 leading-relaxed italic">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-12 gap-12 pt-8">
          <div className="col-span-7 space-y-12">
             {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Education</h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-xs text-gray-500 italic mt-1">{edu.school} · {edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="col-span-5 space-y-12">
            {/* Skills */}
            <section>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6">Expertise</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[9px] font-black uppercase text-gray-400 mb-2 tracking-widest">Technical</h4>
                  <p className="text-xs text-gray-600 leading-relaxed italic">{skills.technical.join(', ')}</p>
                </div>
                <div>
                  <h4 className="text-[9px] font-black uppercase text-gray-400 mb-2 tracking-widest">Leadership</h4>
                  <p className="text-xs text-gray-600 leading-relaxed italic">{skills.soft.join(', ')}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
