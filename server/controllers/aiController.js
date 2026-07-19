const cleanText = (value = '') => String(value).replace(/\s+/g, ' ').trim();

const titleCase = (value = '') =>
  cleanText(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const skillMap = {
  'software developer': ['JavaScript', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Git', 'REST APIs', 'SQL', 'Debugging', 'Problem Solving', 'OOP', 'Agile', 'Communication', 'Teamwork', 'Testing'],
  'full stack developer': ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'Git', 'Authentication', 'Testing', 'Debugging', 'Problem Solving', 'Teamwork'],
  'frontend developer': ['HTML', 'CSS', 'JavaScript', 'React.js', 'Responsive Design', 'REST APIs', 'Git', 'Accessibility', 'Performance Optimization', 'Testing', 'Debugging', 'UI/UX', 'Problem Solving', 'Communication', 'Teamwork'],
  'backend developer': ['Node.js', 'Express.js', 'Java', 'Python', 'REST APIs', 'SQL', 'MongoDB', 'Authentication', 'Data Structures', 'Git', 'Testing', 'Debugging', 'Security', 'Problem Solving', 'Teamwork'],
  'data analyst': ['SQL', 'Excel', 'Python', 'Data Cleaning', 'Data Visualization', 'Statistics', 'Power BI', 'Tableau', 'Reporting', 'Problem Solving', 'Communication', 'Attention to Detail', 'Business Analysis', 'Dashboards', 'Documentation'],
};

const defaultSkills = ['Problem Solving', 'Communication', 'Teamwork', 'Git', 'Testing', 'Debugging', 'Documentation', 'Agile', 'Time Management', 'Attention to Detail', 'Adaptability', 'Critical Thinking', 'REST APIs', 'SQL', 'Data Structures'];

const getSkillsForRole = (jobTitle = '') => {
  const normalized = cleanText(jobTitle).toLowerCase();
  const exact = Object.keys(skillMap).find((key) => normalized.includes(key));
  return exact ? skillMap[exact] : defaultSkills;
};

const improveSentence = (text = '', role = '') => {
  let result = cleanText(text).replace(/^[-•\s]+/, '');
  if (!result) return `Developed and improved key features${role ? ` for ${titleCase(role)} responsibilities` : ''}, ensuring reliable and maintainable results.`;

  const replacements = [
    [/^worked on\b/i, 'Developed'],
    [/^helped\b/i, 'Contributed to'],
    [/^made\b/i, 'Built'],
    [/^did\b/i, 'Executed'],
    [/^handled\b/i, 'Managed'],
    [/^was responsible for\b/i, 'Managed'],
    [/^used\b/i, 'Applied'],
    [/^created\b/i, 'Developed'],
    [/^fixed\b/i, 'Resolved'],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  if (!/^[A-Z]/.test(result)) result = result.charAt(0).toUpperCase() + result.slice(1);
  if (!/[.!?]$/.test(result)) result += '.';
  return result;
};

const improveResumeWithRules = (resumeData = {}) => {
  const updated = JSON.parse(JSON.stringify(resumeData || {}));
  updated.personalInfo = updated.personalInfo || {};
  updated.experience = Array.isArray(updated.experience) ? updated.experience : [];
  updated.skills = updated.skills || { technical: [], soft: [], languages: [], tools: [] };
  updated.skills.technical = Array.isArray(updated.skills.technical) ? updated.skills.technical : [];
  updated.skills.soft = Array.isArray(updated.skills.soft) ? updated.skills.soft : [];

  const role = updated.experience[0]?.title || updated.title || 'Software Developer';
  const combinedSkills = [...updated.skills.technical, ...updated.skills.soft].filter(Boolean);
  const topSkills = combinedSkills.slice(0, 4);

  if (!cleanText(updated.personalInfo.summary) || cleanText(updated.personalInfo.summary).length < 45) {
    const skillPhrase = topSkills.length ? topSkills.join(', ') : 'software development, problem solving, and teamwork';
    updated.personalInfo.summary = `${titleCase(role)} with hands-on experience in ${skillPhrase}. Skilled in building reliable applications, debugging technical issues, and collaborating effectively to deliver high-quality results.`;
  } else {
    updated.personalInfo.summary = cleanText(updated.personalInfo.summary)
      .replace(/\bI\s+am\b/gi, '')
      .replace(/\bI\s+have\b/gi, 'Experienced in')
      .replace(/\bmy\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  updated.experience = updated.experience.map((exp) => ({
    ...exp,
    description: improveSentence(exp.description || exp.bulletPoints?.join(' '), exp.title || role),
  }));

  const recommendedSoft = ['Problem Solving', 'Teamwork', 'Communication', 'Attention to Detail'];
  recommendedSoft.forEach((skill) => {
    if (!updated.skills.soft.some((item) => cleanText(item).toLowerCase() === skill.toLowerCase())) {
      updated.skills.soft.push(skill);
    }
  });

  return updated;
};

export const generateSummary = async (req, res) => {
  try {
    const { title, company, skills = [], experienceYears } = req.body;
    const role = titleCase(title || 'Software Developer');
    const selectedSkills = Array.isArray(skills) && skills.length ? skills.slice(0, 5) : getSkillsForRole(role).slice(0, 5);
    const companyText = cleanText(company) ? `, targeting opportunities at ${cleanText(company)}` : '';
    const experienceText = cleanText(experienceYears) ? ` with ${cleanText(experienceYears)} of experience` : '';

    const summary = `${role}${experienceText}${companyText}, with practical knowledge of ${selectedSkills.join(', ')}. Skilled in building reliable solutions, debugging technical issues, and writing maintainable code. Strong problem-solving, communication, and teamwork abilities with a commitment to continuous learning.`;

    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to generate summary.' });
  }
};

export const improveBullet = async (req, res) => {
  try {
    const { text, role } = req.body;
    if (!cleanText(text)) return res.status(400).json({ success: false, message: 'Bullet text is required.' });
    res.status(200).json({ success: true, data: improveSentence(text, role) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to improve bullet point.' });
  }
};

export const suggestSkills = async (req, res) => {
  try {
    const { jobTitle } = req.body;
    res.status(200).json({ success: true, data: getSkillsForRole(jobTitle) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to suggest skills.' });
  }
};

export const autoFixResume = async (req, res) => {
  try {
    const { resumeData } = req.body;
    if (!resumeData) return res.status(400).json({ success: false, message: 'Resume data is required.' });
    const updatedData = improveResumeWithRules(resumeData);
    res.status(200).json({ success: true, data: updatedData, message: 'Resume improved successfully using smart rule-based suggestions.' });
  } catch (error) {
    console.error('Auto-fix error:', error);
    res.status(500).json({ success: false, message: 'Unable to improve resume.' });
  }
};
