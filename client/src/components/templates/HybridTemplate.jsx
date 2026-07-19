import React from 'react';
import ContactLink from '../ContactLink';

export default function HybridTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-gray-800 p-0 min-h-[1056px] w-[816px] mx-auto shadow-sm font-sans" id="resume-document">
      {/* Top Header Section */}
      <div className="bg-slate-900 text-white p-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
              {personalInfo.phone && <span>· <ContactLink type="phone" value={personalInfo.phone} /></span>}
              {personalInfo.email && <span>· <ContactLink type="email" value={personalInfo.email} /></span>}
            </div>
          </div>
          <div className="text-right text-xs font-bold text-slate-400 space-y-1">
             <p className="text-slate-100"><ContactLink type="url" value={personalInfo.linkedin} /></p>
             <p className="text-slate-100"><ContactLink type="url" value={personalInfo.portfolio} /></p>
          </div>
        </div>
      </div>


      <div className="p-10 grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Professional Profile</h2>
              <p className="text-sm leading-relaxed text-gray-600 italic">"{personalInfo.summary}"</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                      <span className="text-xs font-black text-slate-400 uppercase">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-600 mb-2 uppercase tracking-tighter">{exp.company} | {exp.location}</div>
                    <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed pl-4 border-l-2 border-slate-50">
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
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Core Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{proj.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{proj.technologies}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Expertise</h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Technical</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map(s => <span key={s} className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg">{s}</span>)}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">Leadership</h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.soft.map(s => <span key={s} className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg">{s}</span>)}
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-[10px] text-slate-500 font-medium">{edu.school}</p>
                    <p className="text-[10px] font-black text-slate-300 uppercase mt-1">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards */}
          {achievements && achievements.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-300 mb-4 border-b pb-1">Recognition</h2>
              <div className="space-y-4">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <h3 className="text-xs font-bold text-slate-900">{ach.title}</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">{ach.description}</p>
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
