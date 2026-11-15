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

export const router = express.Router();

router.post('/', protect, createFolio);
router.get('/me', protect, getMyFolio);
router.patch('/me', protect, updateMyFolio);
router.delete('/me', protect, deleteMyFolio);

router.get('/check-slug/:slug', checkSlugAvailability);
router.get('/:slug', getPublicFolio);

