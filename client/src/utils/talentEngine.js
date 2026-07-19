const SKILLS = [
  'Java','JavaScript','TypeScript','Python','C++','C#','SQL','HTML','CSS','React','React.js','Node.js','Express','Express.js','MongoDB','Azure','Azure SQL','Power BI','Git','REST APIs','Data Structures','Algorithms','Spring','Selenium','Excel','Data Analytics','Machine Learning','AI','Docker','Kubernetes'
]

export function extractSkills(text='') {
  const lower = text.toLowerCase()
  return [...new Set(SKILLS.filter(skill => lower.includes(skill.toLowerCase())))]
}

export function calculateMatch(resumeText='', jdText='') {
  const resumeSkills = extractSkills(resumeText)
  const jdSkills = extractSkills(jdText)
  const matched = jdSkills.filter(s => resumeSkills.some(r => r.toLowerCase() === s.toLowerCase()))
  const missing = jdSkills.filter(s => !matched.includes(s))
  const score = jdSkills.length ? Math.round((matched.length / jdSkills.length) * 100) : Math.min(95, 45 + resumeSkills.length * 4)
  return { score, resumeSkills, jdSkills, matched, missing }
}

export function generateInterviewQuestions(resumeText='', jdText='') {
  const { matched, missing, resumeSkills } = calculateMatch(resumeText, jdText)
  const focus = [...matched, ...missing, ...resumeSkills].slice(0, 6)
  const technical = focus.map(skill => `Explain a challenging project where you used ${skill}. What trade-offs did you make?`)
  return [
    'Tell me about yourself and why this role is a strong fit for your career goals.',
    'Describe a difficult bug you solved. How did you identify the root cause?',
    ...technical,
    'How do you prioritize work when requirements change close to a deadline?',
    'Describe a time you received critical feedback and how you acted on it.',
    'What would you improve in this product during your first 90 days?'
  ].slice(0, 10)
}
