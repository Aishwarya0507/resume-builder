import React from 'react';
import ContactLink from '../ContactLink';

export default function AcademicTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-gray-900 p-16 min-h-[1056px] w-[816px] mx-auto shadow-sm font-serif" id="resume-document">
      {/* Header */}
      <header className="text-center mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-3xl font-light tracking-wide mb-4">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-xs space-x-3 italic text-gray-600">
          <ContactLink type="email" value={personalInfo.email} />
          {personalInfo.phone && <span>· <ContactLink type="phone" value={personalInfo.phone} /></span>}
          {(personalInfo.city || personalInfo.country) && (
            <span>· {personalInfo.city}, {personalInfo.country}</span>
          )}
        </div>
        <div className="text-xs space-x-3 italic text-gray-500 mt-2">
          {personalInfo.linkedin && <span>LinkedIn: <ContactLink type="url" value={personalInfo.linkedin} /></span>}
          {personalInfo.portfolio && <span>· Portfolio: <ContactLink type="url" value={personalInfo.portfolio} /></span>}
        </div>
      </header>


      {/* Education - Prioritized in Academic CV */}
      {education && education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{edu.school}</h3>
                  <span className="text-xs italic text-gray-500">{edu.graduationYear}</span>
                </div>
                <p className="text-xs italic">{edu.degree} in {edu.field}</p>
                {edu.gpa && <p className="text-[10px] text-gray-500 mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience / Research */}
      {experience && experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-xs italic text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-xs italic text-gray-600 mb-2">{exp.title} | {exp.location}</p>
                <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-4 border-l border-gray-100">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Training */}
      {certifications && certifications.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Certifications & Training</h2>
          <ul className="space-y-2">
            {certifications.map((cert) => (
              <li key={cert.id} className="text-xs flex justify-between">
                <span><span className="font-bold">{cert.name}</span>, {cert.issuer}</span>
                <span className="italic text-gray-500">{cert.year}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements & Awards */}
      {achievements && achievements.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Awards & Honors</h2>
          <div className="space-y-4">
            {achievements.map((ach) => (
              <div key={ach.id}>
                <h3 className="text-xs font-bold text-gray-900">{ach.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed italic">{ach.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects / Publications */}
      {projects && projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Research Projects & Publications</h2>
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-xs font-bold italic text-gray-900">"{proj.name}"</h3>
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase">{proj.technologies}</p>
                <p className="text-xs text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section>
        <h2 className="text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-widest text-gray-500">Competencies</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
          {skills.technical.length > 0 && (
            <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
          )}
          {skills.soft.length > 0 && (
            <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
