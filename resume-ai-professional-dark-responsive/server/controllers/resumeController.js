import Resume from '../models/Resume.js'

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-__v')

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('user', 'firstName lastName email')

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    // Increment view count
    resume.viewCount += 1
    await resume.save()

    res.status(200).json({ success: true, data: resume })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id,
    })

    res.status(201).json({ success: true, data: resume })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({ success: true, data: resume })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id)

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({ success: true, message: 'Resume deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Analyze resume using deterministic ATS rules
// @route   POST /api/resumes/:id/analyze
// @access  Private
export const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    const summary = resume.personalInfo?.summary?.trim() || ''
    const experience = Array.isArray(resume.experience) ? resume.experience : []
    const education = Array.isArray(resume.education) ? resume.education : []
    const skills = Array.isArray(resume.skills) ? resume.skills : []
    const projects = Array.isArray(resume.projects) ? resume.projects : []

    const text = [
      resume.title,
      summary,
      ...experience.flatMap((item) => [item.jobTitle, item.company, item.description, ...(item.bulletPoints || [])]),
      ...skills.map((item) => item.name),
      ...projects.flatMap((item) => [item.name, item.description, ...(item.technologies || [])]),
    ].filter(Boolean).join(' ')

    const actionVerbs = ['developed', 'built', 'implemented', 'designed', 'optimized', 'improved', 'created', 'managed', 'collaborated', 'resolved', 'tested', 'integrated']
    const keywordHits = actionVerbs.filter((word) => new RegExp(`\\b${word}\\b`, 'i').test(text)).length
    const hasMetrics = /(\d+%|\d+\+|\d+\s*(users|projects|features|hours|days|weeks|months))/i.test(text)

    const completenessItems = [
      resume.personalInfo?.firstName,
      resume.personalInfo?.email,
      resume.personalInfo?.phone,
      summary,
      experience.length,
      education.length,
      skills.length,
      projects.length,
    ]
    const completeness = Math.round((completenessItems.filter(Boolean).length / completenessItems.length) * 100)
    const keywords = Math.min(100, 45 + skills.length * 5 + keywordHits * 4)
    const formatting = Math.min(100, 65 + (summary.length <= 600 ? 10 : 0) + (experience.length <= 6 ? 10 : 0) + (skills.length >= 5 ? 10 : 0))
    const readability = Math.min(100, 60 + (summary.length >= 50 && summary.length <= 450 ? 15 : 0) + (text.length > 250 ? 10 : 0) + keywordHits * 2)
    const impact = Math.min(100, 45 + keywordHits * 5 + (hasMetrics ? 20 : 0) + projects.length * 5)
    const overall = Math.round((keywords + formatting + readability + completeness + impact) / 5)

    const suggestions = []
    if (summary.length < 50) suggestions.push('Add a concise professional summary of 2–3 sentences.')
    if (skills.length < 6) suggestions.push('Add more role-relevant technical and soft skills.')
    if (!hasMetrics) suggestions.push('Quantify achievements with numbers, percentages, or measurable outcomes where truthful.')
    if (keywordHits < 3) suggestions.push('Begin experience and project bullets with strong action verbs.')
    if (!projects.length) suggestions.push('Add at least one completed project with technologies and outcomes.')
    if (!suggestions.length) suggestions.push('Tailor keywords to each job description before applying.')

    const score = {
      overall,
      breakdown: { keywords, formatting, readability, completeness, impact },
      suggestions: suggestions.slice(0, 5),
      lastAnalyzed: new Date(),
    }

    resume.atsScore = {
      overall: score.overall,
      breakdown: score.breakdown,
      lastAnalyzed: score.lastAnalyzed,
    }
    await resume.save()

    res.status(200).json({ success: true, data: { resumeId: resume._id, ...score } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Duplicate a resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
export const duplicateResume = async (req, res) => {
  try {
    const original = await Resume.findById(req.params.id)

    if (!original) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    const duplicated = await Resume.create({
      ...original.toObject(),
      _id: undefined,
      title: `${original.title} (Copy)`,
      downloadCount: 0,
      viewCount: 0,
      createdAt: undefined,
      updatedAt: undefined,
    })

    res.status(201).json({ success: true, data: duplicated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
