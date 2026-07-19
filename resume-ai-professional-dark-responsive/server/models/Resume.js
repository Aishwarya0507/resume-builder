import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  current: { type: Boolean, default: false },
  description: { type: String, trim: true },
  bulletPoints: [{ type: String }],
})

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  fieldOfStudy: { type: String, trim: true },
  institution: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  graduationYear: { type: String },
  gpa: { type: String },
})

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['technical', 'soft', 'language', 'tool'],
    default: 'technical',
  },
  name: { type: String, required: true, trim: true },
  proficiency: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate',
  },
})

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    template: {
      type: String,
      enum: [
        'Modern', 'Classic', 'Minimal', 'Creative', 'Executive', 'Tech Pro',
        'Simple ATS', 'Developer', 'Academic', 'Retail', 'Corporate', 
        'Elegant', 'Compact', 'Hybrid', 'Functional'
      ],
      default: 'Modern',
    },

    // Personal info
    personalInfo: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      location: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      website: { type: String, trim: true },
      summary: { type: String, trim: true, maxlength: 600 },
    },

    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],

    // Certifications
    certifications: [
      {
        name: { type: String, trim: true },
        issuer: { type: String, trim: true },
        date: { type: String },
        url: { type: String },
      },
    ],

    // Projects
    projects: [
      {
        name: { type: String, trim: true },
        description: { type: String, trim: true },
        url: { type: String },
        technologies: [{ type: String }],
      },
    ],

    // Achievements
    achievements: [
      {
        title: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],

    // Analytics
    atsScore: {
      overall: { type: Number, min: 0, max: 100, default: 0 },
      breakdown: {
        keywords: { type: Number, default: 0 },
        formatting: { type: Number, default: 0 },
        readability: { type: Number, default: 0 },
        completeness: { type: Number, default: 0 },
        impact: { type: Number, default: 0 },
      },
      lastAnalyzed: { type: Date },
    },

    isPublic: { type: Boolean, default: false },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
resumeSchema.index({ user: 1, createdAt: -1 })
resumeSchema.index({ 'atsScore.overall': -1 })

export default mongoose.model('Resume', resumeSchema)
