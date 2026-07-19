import express from 'express'
import {
  getJobs,
  getJob,
  getMatchedJobs,
  createJob,
} from '../controllers/jobController.js'

const router = express.Router()

router.route('/')
  .get(getJobs)
  .post(createJob)

router.post('/match', getMatchedJobs)

router.route('/:id')
  .get(getJob)

export default router
