import express from 'express';
import { enrollCourse } from '../controllers/enrollController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/:courseId', protect, authorizeRoles('student'), enrollCourse);

export default router;
