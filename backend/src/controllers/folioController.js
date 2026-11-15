import asyncHandler from '../utils/asyncHandler.js';
import {Folio} from '../models/folioModel.js';
import {User} from '../models/userModel.js';
import {
  getCachedFolio,
  setCachedFolio,
  invalidateFolioCache,
} from '../utils/folioCache.js';

const PUBLIC_USER_FIELDS =
  'name email bio avatar resume address phone education social skills projects experience testimonials';

export const createFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id; 
  const { slug, template_id } = req.body;

  if (!slug || !template_id) {
    res.status(400);
    throw new Error('Please provide a slug and a template ID.');
  }

  const slugExists = await Folio.findOne({ slug: slug.toLowerCase() });
  if (slugExists) {
    res.status(400);
    throw new Error('That URL (slug) is already taken. Please try another.');
  }

  const userHasFolio = await Folio.findOne({ user_id });
  if (userHasFolio) {
    res.status(400);
    throw new Error('This user already has a portfolio.');
  }

  const newFolio = new Folio({
    slug: slug.toLowerCase(),
    template_id,
    user_id
  });
  const savedFolio = await newFolio.save();

  await User.findByIdAndUpdate(user_id, { folio_id: savedFolio._id });

  res.status(201).json({
    message: 'Folio created successfully!',
    data: savedFolio,
  });
});

export const getPublicFolio = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  
  const cachedFolio = await getCachedFolio(slug);
  if (cachedFolio) {
    return res.status(200).json(cachedFolio);
  }

  const folio = await Folio.findOne({ slug })
    .populate({ path: 'user_id', select: PUBLIC_USER_FIELDS })
    .lean();

  if (!folio) {
    res.status(404);
    throw new Error('Portfolio not found.');
  }

  await setCachedFolio(slug, folio);

  return res.status(200).json(folio);
});

export const getMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const folio = await Folio.findOne({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('You do not have a folio yet.');
  }

  res.status(200).json({ data: folio });
});

export const updateMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { template_id, main_color, secondry_color, accent_color, font } = req.body;

  const folio = await Folio.findOne({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('Folio not found for this user.');
  }

  folio.template_id = template_id || folio.template_id;

  const updatedFolio = await folio.save();
  await invalidateFolioCache(folio.slug);
  res.status(200).json({ data: updatedFolio });
});

export const deleteMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  const folio = await Folio.findOneAndDelete({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('Folio not found for this user.');
  }

  await User.findByIdAndUpdate(user_id, {
    $unset: { folio_id: 1 }
  });

  await invalidateFolioCache(folio.slug);

  res.status(200).json({ message: "Folio deleted successfully" });
});

export const checkSlugAvailability = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const folio = await Folio.findOne({ slug: slug }, '_id');

  res.status(200).json({ available: !folio });
});