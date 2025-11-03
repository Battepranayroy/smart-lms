import express from 'express';
import { enrollCourse } from '../controllers/enrollController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/:courseId', protect, authorizeRoles('student'), enrollCourse);

export default router;
