import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: { type: String, trim: true },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote'],
      default: 'full-time',
    },
    salaryMin: { type: Number },
    salaryMax: { type: Number },
    currency: { type: String, default: 'USD' },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    skills: [{ type: String }],
    benefits: [{ type: String }],
    applicationUrl: { type: String },
    sourceId: { type: String },         // external job board ID
    source: { type: String },           // e.g. 'linkedin', 'indeed'
    isActive: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

jobSchema.index({ skills: 1 })
jobSchema.index({ location: 1 })
jobSchema.index({ postedAt: -1 })
jobSchema.index({ title: 'text', company: 'text', description: 'text' })

export default mongoose.model('Job', jobSchema)
