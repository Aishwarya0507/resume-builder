import React from 'react';
import ContactLink from '../ContactLink';

export default function ClassicTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-10 min-h-[1056px] w-[816px] mx-auto font-serif" id="resume-document">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-widest">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          {(personalInfo.city || personalInfo.country) && (personalInfo.phone || personalInfo.email || personalInfo.linkedin) && <span>|</span>}
          <ContactLink type="phone" value={personalInfo.phone} />
          {personalInfo.phone && (personalInfo.email || personalInfo.linkedin) && <span>|</span>}
          <ContactLink type="email" value={personalInfo.email} />
          {personalInfo.email && personalInfo.linkedin && <span>|</span>}
          <ContactLink type="url" value={personalInfo.linkedin} />
          {personalInfo.linkedin && personalInfo.portfolio && <span>|</span>}
          <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-widest text-center border-b border-gray-300 pb-1">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-800 text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest text-center border-b border-gray-300 pb-1">Professional Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h3 className="text-md font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-sm italic text-gray-700">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold italic text-gray-800 mb-2">{exp.title}</p>
                <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed pl-4 list-disc">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest text-center border-b border-gray-300 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-md font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-800 italic">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                </div>
                <span className="text-sm text-gray-700">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0 || skills.tools.length > 0) && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-widest text-center border-b border-gray-300 pb-1">Core Competencies</h2>
          <div className="text-sm space-y-2 text-gray-800">
            {skills.technical.length > 0 && (
              <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
            )}
            {skills.tools.length > 0 && (
              <p><strong>Tools:</strong> {skills.tools.join(', ')}</p>
            )}
            {skills.soft.length > 0 && (
              <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>
            )}
            {skills.languages.length > 0 && (
              <p><strong>Languages:</strong> {skills.languages.join(', ')}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
