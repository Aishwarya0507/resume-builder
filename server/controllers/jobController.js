import Job from '../models/Job.js'

// @desc    Get all jobs with optional filters
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const { search, location, type, minSalary, maxSalary, skills, page = 1, limit = 10 } = req.query

    const query = { isActive: true }

    if (search) {
      query.$text = { $search: search }
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' }
    }
    if (type) {
      query.type = type
    }
    if (minSalary) {
      query.salaryMin = { $gte: Number(minSalary) }
    }
    if (maxSalary) {
      query.salaryMax = { $lte: Number(maxSalary) }
    }
    if (skills) {
      const skillsArray = skills.split(',').map((s) => s.trim())
      query.skills = { $in: skillsArray }
    }

    const skip = (Number(page) - 1) * Number(limit)
    const total = await Job.countDocuments(query)
    const jobs = await Job.find(query)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-__v')

    res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: jobs,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    res.status(200).json({ success: true, data: job })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get AI-matched jobs for a user's resume
// @route   POST /api/jobs/match
// @access  Private
export const getMatchedJobs = async (req, res) => {
  try {
    const { skills = [], title = '', experience = [] } = req.body

    // --- Stub: Replace with vector similarity / AI matching ---
    const allJobs = await Job.find({ isActive: true }).limit(50)

    const scored = allJobs.map((job) => {
      const jobSkills = job.skills.map((s) => s.toLowerCase())
      const userSkills = skills.map((s) => s.toLowerCase())
      const matchingSkills = userSkills.filter((s) => jobSkills.includes(s))
      const matchScore = Math.round((matchingSkills.length / Math.max(jobSkills.length, 1)) * 100)

      return {
        ...job.toObject(),
        matchScore: Math.min(matchScore + Math.floor(Math.random() * 15), 99),
        matchingSkills,
      }
    })

    const sorted = scored
      .filter((j) => j.matchScore > 40)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20)

    res.status(200).json({
      success: true,
      count: sorted.length,
      data: sorted,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create a job (admin / seeding)
// @route   POST /api/jobs
// @access  Private/Admin
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body)
    res.status(201).json({ success: true, data: job })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
