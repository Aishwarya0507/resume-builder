import React from 'react';
import ContactLink from '../ContactLink';

export default function CreativeTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-gray-800 p-0 min-h-[1056px] w-[816px] mx-auto overflow-hidden relative shadow-lg font-sans" id="resume-document">
      {/* Decorative Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-indigo-600" />
      
      <div className="pl-12 pr-10 py-10">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-2">
            {personalInfo.firstName}<br />
            <span className="text-indigo-600">{personalInfo.lastName}</span>
          </h1>
          <div className="h-1 w-20 bg-indigo-600 mb-6" />
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <ContactLink type="email" value={personalInfo.email} />
            <ContactLink type="phone" value={personalInfo.phone} />
            {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
            <ContactLink type="url" value={personalInfo.linkedin} />
            <ContactLink type="url" value={personalInfo.portfolio} />
          </div>
        </header>


        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 space-y-10">
            {/* Summary */}
            {personalInfo.summary && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-indigo-200" /> About Me
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">{personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-indigo-200" /> Professional Journey
                </h2>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded text-gray-500">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="text-sm font-bold text-indigo-600/70 mb-3 uppercase tracking-tight">{exp.company} | {exp.location}</div>
                      <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed italic border-l-2 border-indigo-50 pr-4">
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-4 space-y-10">
            {/* Skills */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-indigo-200" /> Toolkit
              </h2>
              <div className="space-y-6">
                {skills.technical.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3">Hard Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.technical.map(s => <span key={s} className="px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full">{s}</span>)}
                    </div>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-gray-400 mb-3">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.soft.map(s => <span key={s} className="px-2 py-1 border border-indigo-200 text-indigo-600 text-[10px] font-bold rounded-full">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Projects */}
            {projects && projects.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-indigo-200" /> Showcase
                </h2>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="border-b border-indigo-50 pb-4">
                      <h3 className="text-xs font-bold text-gray-900 mb-1">{proj.name}</h3>
                      <p className="text-[10px] text-gray-500 leading-snug">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section>
                <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-indigo-200" /> Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-[10px] text-gray-500">{edu.school}</p>
                      <p className="text-[10px] font-bold text-indigo-300 mt-1">{edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
