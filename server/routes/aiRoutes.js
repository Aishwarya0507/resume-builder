import express from 'express';
import { generateSummary, improveBullet, suggestSkills, autoFixResume } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-summary', generateSummary);
router.post('/improve-bullet', improveBullet);
router.post('/suggest-skills', suggestSkills);
router.post('/auto-fix', autoFixResume);

export default router;

