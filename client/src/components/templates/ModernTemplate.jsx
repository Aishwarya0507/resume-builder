import React from 'react';
import ContactLink from '../ContactLink';

export default function ModernTemplate({ data }) {
  const { personalInfo, experience, education, skills } = data;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-[1056px] w-[816px] mx-auto shadow-sm" id="resume-document">
      {/* Header */}
      <header className="border-b-2 border-indigo-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {personalInfo.firstName} <span className="text-indigo-600">{personalInfo.lastName}</span>
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <ContactLink type="email" value={personalInfo.email} />
          <ContactLink type="phone" value={personalInfo.phone} />
          {(personalInfo.city || personalInfo.country) && (
            <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
          )}
          <ContactLink type="url" value={personalInfo.linkedin} className="text-indigo-600" />
          <ContactLink type="url" value={personalInfo.portfolio} className="text-indigo-600" />
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-indigo-600 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-md font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs font-semibold text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-2">{exp.company}</p>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
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
          <h2 className="text-lg font-bold text-indigo-600 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-md font-bold text-gray-900">{edu.school}</h3>
                  <p className="text-sm text-gray-700">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                </div>
                <span className="text-xs font-semibold text-gray-600">{edu.graduationYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0 || skills.tools.length > 0) && (
        <section>
          <h2 className="text-lg font-bold text-indigo-600 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Skills</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {skills.technical.length > 0 && (
              <div>
                <strong className="block text-gray-900 mb-1">Technical</strong>
                <p className="text-gray-700">{skills.technical.join(', ')}</p>
              </div>
            )}
            {skills.tools.length > 0 && (
              <div>
                <strong className="block text-gray-900 mb-1">Tools & Platforms</strong>
                <p className="text-gray-700">{skills.tools.join(', ')}</p>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <strong className="block text-gray-900 mb-1">Soft Skills</strong>
                <p className="text-gray-700">{skills.soft.join(', ')}</p>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div>
                <strong className="block text-gray-900 mb-1">Languages</strong>
                <p className="text-gray-700">{skills.languages.join(', ')}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
