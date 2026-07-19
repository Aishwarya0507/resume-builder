import React from 'react';
import ContactLink from '../ContactLink';

export default function MinimalTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-[1056px] w-[816px] mx-auto font-sans" id="resume-document">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column */}
        <div className="w-1/3 space-y-6">
          <header className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-1 leading-tight">
              {personalInfo.firstName}<br/><span className="font-bold">{personalInfo.lastName}</span>
            </h1>
          </header>

          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Contact</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><ContactLink type="email" value={personalInfo.email} /></p>
              <p><ContactLink type="phone" value={personalInfo.phone} /></p>
              {(personalInfo.city || personalInfo.country) && (
                <p>{personalInfo.city}, {personalInfo.country}</p>
              )}
              <p className="truncate"><ContactLink type="url" value={personalInfo.linkedin} /></p>
              <p className="truncate"><ContactLink type="url" value={personalInfo.portfolio} /></p>
            </div>
          </section>


          {(skills.technical.length > 0 || skills.tools.length > 0) && (
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {[...skills.technical, ...skills.tools].map((skill, i) => (
                  <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Education</h2>
              <div className="space-y-4 text-sm">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-800">{edu.degree}</p>
                    <p className="text-gray-600">{edu.field}</p>
                    <p className="text-gray-500 text-xs mt-1">{edu.school} • {edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-2/3 space-y-8 border-l border-gray-100 pl-8">
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Profile</h2>
              <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-md font-bold text-gray-900">{exp.title}</h3>
                    <div className="text-sm text-gray-500 mb-2">{exp.company} • {exp.startDate} - {exp.endDate}</div>
                    <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {(skills.soft.length > 0 || skills.languages.length > 0) && (
            <section>
               <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Additional Skills</h2>
               <div className="text-sm text-gray-700 space-y-2">
                 {skills.soft.length > 0 && <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>}
                 {skills.languages.length > 0 && <p><strong>Languages:</strong> {skills.languages.join(', ')}</p>}
               </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}
