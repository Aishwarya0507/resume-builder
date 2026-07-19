const STOP_WORDS = new Set(['and','the','with','for','that','this','from','your','you','are','was','were','have','has','will','into','our','their','job','role','work','using','used','about','who','but','not','all','any','can','may','years','year','plus','such','including','required','preferred']);

export const normalizeText = (value = '') => String(value).toLowerCase().replace(/[^a-z0-9+#.\s-]/g, ' ').replace(/\s+/g, ' ').trim();

export const extractKeywords = (value = '') => {
  const words = normalizeText(value).split(' ').filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  return [...new Set(words)];
};

const hasSection = (text, names) => names.some((name) => new RegExp(`\\b${name}\\b`, 'i').test(text));
const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));

export function analyzeResumeText(resumeText, jobDescription = '') {
  const text = String(resumeText || '').trim();
  const normalized = normalizeText(text);
  const jobKeywords = extractKeywords(jobDescription).slice(0, 80);
  const matchedKeywords = jobKeywords.filter((keyword) => normalized.includes(keyword));
  const keywordScore = jobKeywords.length ? (matchedKeywords.length / jobKeywords.length) * 100 : Math.min(95, 45 + extractKeywords(text).length / 3);

  const sections = [
    hasSection(text, ['summary', 'profile', 'objective']),
    hasSection(text, ['experience', 'internship', 'employment']),
    hasSection(text, ['education', 'academic']),
    hasSection(text, ['skills', 'technical skills']),
    hasSection(text, ['projects', 'project']),
    hasSection(text, ['certifications', 'certificates', 'achievements']),
  ];
  const completeness = (sections.filter(Boolean).length / sections.length) * 100;

  const actionVerbs = ['developed','built','implemented','designed','created','optimized','improved','integrated','tested','debugged','managed','collaborated','automated','deployed','analyzed'];
  const actionHits = actionVerbs.filter((verb) => normalized.includes(verb)).length;
  const metrics = (text.match(/\b\d+(?:\.\d+)?(?:%|\+|x)?\b/g) || []).length;
  const impact = clamp(40 + actionHits * 4 + Math.min(metrics, 8) * 4);
  const readability = clamp(55 + (text.length >= 500 ? 15 : 0) + (text.length <= 7000 ? 10 : 0) + (text.split(/\n/).filter(Boolean).length >= 8 ? 10 : 0));
  const formatting = clamp(60 + (text.includes('@') ? 8 : 0) + (/\+?\d[\d\s-]{8,}/.test(text) ? 8 : 0) + sections.filter(Boolean).length * 4);
  const overall = clamp((keywordScore + completeness + impact + readability + formatting) / 5);

  const suggestions = [];
  if (!sections[0]) suggestions.push({ type: 'warning', text: 'Add a targeted 2–3 line professional summary.' });
  if (!sections[1]) suggestions.push({ type: 'error', text: 'Add internship or work experience with achievement-focused bullet points.' });
  if (!sections[4]) suggestions.push({ type: 'warning', text: 'Add relevant projects with technologies and outcomes.' });
  if (metrics < 2) suggestions.push({ type: 'warning', text: 'Add truthful numbers, percentages, users, or performance improvements.' });
  if (actionHits < 4) suggestions.push({ type: 'warning', text: 'Start more bullets with strong action verbs such as Developed, Built, or Implemented.' });
  if (jobKeywords.length && matchedKeywords.length < Math.max(3, jobKeywords.length * .35)) suggestions.push({ type: 'error', text: `Add relevant job-description keywords where truthful. Missing examples: ${jobKeywords.filter(k => !matchedKeywords.includes(k)).slice(0, 6).join(', ')}.` });
  if (sections.filter(Boolean).length >= 5) suggestions.unshift({ type: 'success', text: 'Your resume contains most core ATS sections.' });
  if (text.includes('@') && /\+?\d[\d\s-]{8,}/.test(text)) suggestions.unshift({ type: 'success', text: 'Contact details appear complete and readable.' });

  return {
    overall,
    categories: [
      { label: 'Keyword Match', score: clamp(keywordScore) },
      { label: 'Formatting', score: formatting },
      { label: 'Readability', score: readability },
      { label: 'Completeness', score: clamp(completeness) },
      { label: 'Impact Statements', score: impact },
    ],
    suggestions: suggestions.slice(0, 8),
    matchedKeywords: matchedKeywords.slice(0, 15),
  };
}

export function scoreJobMatch(resumeText, job) {
  const resume = normalizeText(resumeText);
  const skills = (job.skills || []).map(normalizeText);
  const matched = skills.filter((skill) => resume.includes(skill));
  const skillScore = skills.length ? matched.length / skills.length * 100 : 0;
  const titleWords = extractKeywords(job.title || '');
  const titleScore = titleWords.length ? titleWords.filter(w => resume.includes(w)).length / titleWords.length * 100 : 0;
  return { score: clamp(skillScore * .8 + titleScore * .2), matched };
}
