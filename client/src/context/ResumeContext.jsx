import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';


const ResumeContext = createContext();

const initialResumeState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    city: '',
    country: '',
    summary: '',
  },
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  achievements: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
    tools: [],
  },
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resumeDraft')) || initialResumeState; } catch { return initialResumeState; }
  });
  const [selectedTemplate, setSelectedTemplate] = useState(() => localStorage.getItem('selectedTemplate') || 'Modern');

  useEffect(() => { localStorage.setItem('resumeDraft', JSON.stringify(resumeData)); }, [resumeData]);
  useEffect(() => { localStorage.setItem('selectedTemplate', selectedTemplate); }, [selectedTemplate]);

  // helper functions
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), title: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
    }));
  }

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  }

  const removeExperience = (id) => {
     setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), degree: '', field: '', school: '', location: '', graduationYear: '', gpa: '' }]
    }));
  }

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  }

  const removeEducation = (id) => {
     setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now(), name: '', description: '', url: '', technologies: '' }]
    }));
  }

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  }

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  }

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now(), name: '', issuer: '', year: '' }]
    }));
  }

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    }));
  }

  const removeCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  }

  const addAchievement = () => {
    setResumeData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { id: Date.now(), title: '', description: '' }]
    }));
  }

  const updateAchievement = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  }

  const removeAchievement = (id) => {
    setResumeData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  }

  const addSkill = (category, skill) => {
     if (!skill.trim()) return;
     setResumeData(prev => {
        // Prevent duplicates
        if (prev.skills[category].includes(skill.trim())) return prev;
        return {
          ...prev,
          skills: {
              ...prev.skills,
              [category]: [...prev.skills[category], skill.trim()]
          }
        }
     });
  }

  const removeSkill = (category, skill) => {
     setResumeData(prev => ({
        ...prev,
        skills: {
            ...prev.skills,
            [category]: prev.skills[category].filter(s => s !== skill)
        }
     }));
  }

  const saveResume = async () => {
    try {
      // Transform data to match Mongoose schema
      const transformedData = {
        title: `${resumeData.personalInfo.firstName || 'My'} Resume`,
        template: selectedTemplate,
        personalInfo: {
          ...resumeData.personalInfo,
          location: `${resumeData.personalInfo.city || ''}, ${resumeData.personalInfo.country || ''}`.trim().replace(/^,|,$/g, ''),
          website: resumeData.personalInfo.portfolio
        },
        experience: resumeData.experience.map(exp => ({
          ...exp,
          jobTitle: exp.title
        })),
        education: resumeData.education.map(edu => ({
          ...edu,
          fieldOfStudy: edu.field,
          institution: edu.school
        })),
        projects: resumeData.projects.map(proj => ({
          ...proj,
          technologies: proj.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
        })),
        certifications: resumeData.certifications.map(cert => ({
          ...cert,
          date: cert.year
        })),
        achievements: resumeData.achievements,
        skills: []
      };

      // Flatten skills
      Object.entries(resumeData.skills).forEach(([category, skillsArray]) => {
        const dbCat = category === 'languages' ? 'language' : (category === 'tools' ? 'tool' : category);
        skillsArray.forEach(skill => {
          transformedData.skills.push({ category: dbCat, name: skill });
        });
      });

      try {
        const response = await api.post('/api/resumes', transformedData);
        return response.data;
      } catch (error) {
        // Keep the builder usable even when the backend/database is temporarily unavailable.
        localStorage.setItem('resumeDraft', JSON.stringify(resumeData));
        console.warn('Saved locally because API save failed:', error?.message);
        return { success: true, data: { ...transformedData, _id: 'local-draft' }, savedLocally: true };
      }
    } catch (error) {
      console.error("Error preparing resume:", error);
      throw error;
    }
  }



  return (
    <ResumeContext.Provider value={{
        resumeData, setResumeData,
        selectedTemplate, setSelectedTemplate,
        updatePersonalInfo,
        addExperience, updateExperience, removeExperience,
        addEducation, updateEducation, removeEducation,
        addProject, updateProject, removeProject,
        addCertification, updateCertification, removeCertification,
        addAchievement, updateAchievement, removeAchievement,
        addSkill, removeSkill,
        saveResume
    }}>

      {children}
    </ResumeContext.Provider>
  );
};


export const useResume = () => useContext(ResumeContext);
