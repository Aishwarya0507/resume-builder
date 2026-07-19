import express from 'express'
import {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
  duplicateResume,
} from '../controllers/resumeController.js'

const router = express.Router()

// Base CRUD
router.route('/')
  .get(getResumes)
  .post(createResume)

router.route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume)

// Special actions
router.post('/:id/analyze', analyzeResume)
router.post('/:id/duplicate', duplicateResume)

export default router
