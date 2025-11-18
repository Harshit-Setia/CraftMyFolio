import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createFolio,
  getPublicFolio,
  getMyFolio,
  updateMyFolio,
  deleteMyFolio
  ,checkSlugAvailability
} from '../controller/folioController.js';

export const router = express.Router();

// --- Private Routes (Require Token) ---
router.post('/', protect, createFolio);
router.get('/me', protect, getMyFolio);
router.patch('/me', protect, updateMyFolio);
router.delete('/me', protect, deleteMyFolio);

// --- Public Route (Anyone can access) ---
router.get('/:slug', getPublicFolio);

// export const router;

router.get('/check-slug/:slug', checkSlugAvailability);