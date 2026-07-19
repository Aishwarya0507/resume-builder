import React from 'react';
import ContactLink from '../ContactLink';

export default function CompactTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-gray-900 p-6 min-h-[1056px] w-[816px] mx-auto font-sans text-[10px]" id="resume-document">
      {/* Header */}
      <header className="flex justify-between items-start mb-4 border-b pb-2">
        <div>
          <h1 className="text-xl font-black uppercase tracking-tighter leading-none">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="flex gap-2 mt-1 text-gray-500 font-bold uppercase tracking-tight">
            {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
            {personalInfo.phone && <span>· <ContactLink type="phone" value={personalInfo.phone} /></span>}
            {personalInfo.email && <span>· <ContactLink type="email" value={personalInfo.email} /></span>}
          </div>
        </div>
        <div className="text-right text-gray-400 font-bold uppercase tracking-widest">
           <ContactLink type="url" value={personalInfo.linkedin} />
           <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 space-y-4">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Work Experience</h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-bold">
                      <span>{exp.title} | {exp.company}</span>
                      <span className="text-gray-400">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-gray-600 italic mb-1">{exp.location}</p>
                    <div className="text-gray-700 whitespace-pre-line leading-snug pl-2 border-l border-gray-100">
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
              <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Projects</h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="font-bold">{proj.name} <span className="font-normal text-gray-400 mx-2">|</span> <span className="font-normal italic">{proj.technologies}</span></div>
                    <p className="text-gray-600 leading-tight">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-4 space-y-4">
          {/* Skills */}
          <section>
            <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Skills</h2>
            <div className="space-y-2">
              {skills.technical.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-500 uppercase text-[9px]">Tech</h4>
                  <p className="text-gray-700">{skills.technical.join(', ')}</p>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-500 uppercase text-[9px]">Soft</h4>
                  <p className="text-gray-700">{skills.soft.join(', ')}</p>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-800 leading-tight">{edu.degree}</h3>
                    <p className="text-gray-500">{edu.school}</p>
                    <p className="text-gray-400 italic">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Certifications</h2>
              <ul className="space-y-1">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-gray-700">
                    <span className="font-bold block leading-none">{cert.name}</span>
                    <span className="text-[9px] text-gray-400">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section>
              <h2 className="font-black uppercase tracking-widest text-gray-300 border-b mb-2">Awards</h2>
              <ul className="space-y-1">
                {achievements.map((ach) => (
                  <li key={ach.id} className="text-gray-700">
                    <span className="font-bold block leading-none">{ach.title}</span>
                    <p className="text-[9px] text-gray-400 leading-tight">{ach.description}</p>
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
