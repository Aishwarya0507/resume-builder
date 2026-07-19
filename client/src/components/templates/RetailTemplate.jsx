import React from 'react';
import ContactLink from '../ContactLink';

export default function RetailTemplate({ data }) {
  const { personalInfo, experience, education, skills, certifications, achievements } = data;

  return (
    <div className="bg-white text-gray-800 p-8 min-h-[1056px] w-[816px] mx-auto shadow-sm font-sans border-l-[15px] border-emerald-600" id="resume-document">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 uppercase mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-xs font-bold text-emerald-600 uppercase tracking-wider">
          <ContactLink type="email" value={personalInfo.email} />
          <ContactLink type="phone" value={personalInfo.phone} />
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          <ContactLink type="url" value={personalInfo.linkedin} />
          <ContactLink type="url" value={personalInfo.portfolio} />
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-black bg-emerald-600 text-white px-3 py-1 inline-block uppercase mb-4">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-black bg-emerald-600 text-white px-3 py-1 inline-block uppercase mb-6">Work History</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs font-black text-emerald-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-tighter">{exp.company} | {exp.location}</div>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-4 border-l-2 border-emerald-50">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mb-8">
        <h2 className="text-sm font-black bg-emerald-600 text-white px-3 py-1 inline-block uppercase mb-4">Core Skills</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Technical</h4>
            <ul className="text-xs space-y-1 list-disc ml-4 text-gray-700">
              {skills.technical.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Service & Soft Skills</h4>
            <ul className="text-xs space-y-1 list-disc ml-4 text-gray-700">
              {skills.soft.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Education & Certs */}
      <div className="grid grid-cols-2 gap-8">
        {education && education.length > 0 && (
          <section>
            <h2 className="text-sm font-black bg-emerald-600 text-white px-3 py-1 inline-block uppercase mb-4">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-xs font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-[10px] text-gray-500">{edu.school}</p>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-black bg-emerald-600 text-white px-3 py-1 inline-block uppercase mb-4">Certifications</h2>
            <ul className="text-xs space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-gray-700">
                  <span className="font-bold block">{cert.name}</span>
                  <span className="text-[10px] text-gray-500">{cert.issuer}, {cert.year}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
