import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createFolio,
  getPublicFolio,
  getMyFolio,
  updateMyFolio,
  deleteMyFolio
  ,checkSlugAvailability
} from '../controllers/folioController.js';
import { recordEvent, getMyAnalytics } from '../controllers/analyticsController.js';

export const router = express.Router();

router.post('/', protect, createFolio);
router.get('/me', protect, getMyFolio);
router.patch('/me', protect, updateMyFolio);
router.delete('/me', protect, deleteMyFolio);
router.get('/me/analytics', protect, getMyAnalytics);

router.get('/check-slug/:slug', checkSlugAvailability);
router.get('/:slug', getPublicFolio);
router.post('/:slug/event', recordEvent);

