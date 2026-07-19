import React from 'react';
import ContactLink from '../ContactLink';

export default function DeveloperTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-zinc-800 p-10 min-h-[1056px] w-[816px] mx-auto shadow-sm font-mono border-t-[10px] border-zinc-900" id="resume-document">
      {/* Header */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter mb-1 text-zinc-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Software Engineer / Developer</p>
        </div>
        <div className="text-[10px] text-right space-y-1 text-zinc-400">
          <p><ContactLink type="email" value={personalInfo.email} /></p>
          <p><ContactLink type="phone" value={personalInfo.phone} /></p>
          <p><ContactLink type="url" value={personalInfo.linkedin} /></p>
          <p><ContactLink type="url" value={personalInfo.portfolio} /></p>
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-black bg-zinc-900 text-white px-2 py-1 uppercase">0x01_Summary</h2>
            <div className="h-[1px] flex-1 bg-zinc-100" />
          </div>
          <p className="text-xs leading-relaxed text-zinc-600">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xs font-black bg-zinc-900 text-white px-2 py-1 uppercase">0x02_Skills</h2>
          <div className="h-[1px] flex-1 bg-zinc-100" />
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {skills.technical.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">// Technical</p>
              <p className="text-xs text-zinc-700 leading-relaxed">{skills.technical.join(' · ')}</p>
            </div>
          )}
          {skills.soft.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">// Soft Skills</p>
              <p className="text-xs text-zinc-700 leading-relaxed">{skills.soft.join(' · ')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-black bg-zinc-900 text-white px-2 py-1 uppercase">0x03_Experience</h2>
            <div className="h-[1px] flex-1 bg-zinc-100" />
          </div>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-zinc-900">{exp.title} <span className="text-zinc-300 mx-2">@</span> {exp.company}</h3>
                  <span className="text-[10px] text-zinc-400 font-bold">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-xs text-zinc-600 whitespace-pre-line leading-relaxed pl-4 border-l border-zinc-100">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-black bg-zinc-900 text-white px-2 py-1 uppercase">0x04_Projects</h2>
            <div className="h-[1px] flex-1 bg-zinc-100" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="group">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1 h-1 bg-zinc-300 group-hover:bg-zinc-900 transition-colors" />
                  <h3 className="text-xs font-bold text-zinc-800">{proj.name}</h3>
                </div>
                <p className="text-[10px] text-zinc-400 font-bold italic mb-2">{proj.technologies}</p>
                <p className="text-[10px] text-zinc-600 leading-snug">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xs font-black bg-zinc-900 text-white px-2 py-1 uppercase">0x05_Education</h2>
            <div className="h-[1px] flex-1 bg-zinc-100" />
          </div>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="text-xs font-bold text-zinc-900">{edu.degree}</h3>
                  <p className="text-[10px] text-zinc-500">{edu.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-400">{edu.graduationYear}</p>
                  {edu.gpa && <p className="text-[9px] text-zinc-300 italic">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
