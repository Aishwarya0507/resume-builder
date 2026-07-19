import React from 'react';
import ContactLink from '../ContactLink';

export default function SimpleATSTemplate({ data }) {
  const { personalInfo, experience, education, skills, projects, certifications, achievements } = data;

  return (
    <div className="bg-white text-black p-10 min-h-[1056px] w-[816px] mx-auto font-serif" id="resume-document">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-xs space-x-2">
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          {personalInfo.phone && <span>| <ContactLink type="phone" value={personalInfo.phone} /></span>}
          {personalInfo.email && <span>| <ContactLink type="email" value={personalInfo.email} /></span>}
          {personalInfo.linkedin && <span>| LinkedIn: <ContactLink type="url" value={personalInfo.linkedin} /></span>}
          {personalInfo.portfolio && <span>| Portfolio: <ContactLink type="url" value={personalInfo.portfolio} /></span>}
        </div>
      </header>


      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-sm font-bold border-b border-black mb-1 uppercase">Summary</h2>
          <p className="text-xs leading-normal">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold border-b border-black mb-2 uppercase">Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.company}</span>
                  <span>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="flex justify-between italic text-xs mb-1">
                  <span>{exp.title}</span>
                  <span>{exp.location}</span>
                </div>
                <div className="text-xs whitespace-pre-line ml-4 list-disc">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold border-b border-black mb-2 uppercase">Projects</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between font-bold text-xs mb-1">
                  <span>{proj.name} | <span className="font-normal italic">{proj.technologies}</span></span>
                </div>
                <p className="text-xs ml-4">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-bold border-b border-black mb-2 uppercase">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between font-bold text-xs">
                  <span>{edu.school}</span>
                  <span>{edu.graduationYear}</span>
                </div>
                <div className="flex justify-between text-xs italic">
                  <span>{edu.degree} in {edu.field}</span>
                  <span>{edu.gpa && `GPA: ${edu.gpa}`}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      <section className="mb-4">
        <h2 className="text-sm font-bold border-b border-black mb-1 uppercase">Skills</h2>
        <div className="text-xs space-y-1">
          {skills.technical.length > 0 && (
            <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
          )}
          {skills.soft.length > 0 && (
            <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>
          )}
        </div>
      </section>

      {/* Certifications & Achievements */}
      <div className="grid grid-cols-2 gap-4">
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b border-black mb-1 uppercase">Certifications</h2>
            <ul className="text-xs list-disc ml-4">
              {certifications.map((cert) => (
                <li key={cert.id}>{cert.name} - {cert.issuer} ({cert.year})</li>
              ))}
            </ul>
          </section>
        )}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-sm font-bold border-b border-black mb-1 uppercase">Achievements</h2>
            <ul className="text-xs list-disc ml-4">
              {achievements.map((ach) => (
                <li key={ach.id}><strong>{ach.title}:</strong> {ach.description}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
