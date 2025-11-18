import asyncHandler from '../util/asyncHandler.js';
import {Folio} from '../model/folioModel.js';
import {User} from '../model/userModel.js';
// import { saveUserAndRespond } from '../utils/controllerUtils.js';

/**
 * @desc    Create a new folio
 * @route   POST /api/v1/folio
 * @access  Private (Needs 'protect' middleware)
 */
export const createFolio = asyncHandler(async (req, res) => {
  // 1. Get user_id from the 'protect' middleware, NOT the body. This is secure.
  const user_id = req.user._id; 
  const { slug, template_id } = req.body;

  if (!slug || !template_id) {
    res.status(400);
    throw new Error('Please provide a slug and a template ID.');
  }

  // 2. Check if the slug (public URL) is already taken
  const slugExists = await Folio.findOne({ slug: slug.toLowerCase() });
  if (slugExists) {
    res.status(400);
    throw new Error('That URL (slug) is already taken. Please try another.');
  }

  // 3. Check if this user already has a folio
  const userHasFolio = await Folio.findOne({ user_id });
  if (userHasFolio) {
    res.status(400);
    throw new Error('This user already has a portfolio.');
  }

  // 4. Create and save the new Folio document
  const newFolio = new Folio({
    slug: slug.toLowerCase(),
    template_id,
    user_id
  });
  const savedFolio = await newFolio.save();

  // 5. Link this new folio to the User document
  await User.findByIdAndUpdate(user_id, { folio_id: savedFolio._id });

  // 6. Send back the correct response
  res.status(201).json({
    message: 'Folio created successfully!',
    data: savedFolio,
  });
});

/**
 * @desc    Get a public folio by its slug
 * @route   GET /api/v1/folio/:slug
 * @access  Public
 */
export const getPublicFolio = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  
  // 1. Find the folio by its 'slug'
  const folio = await Folio.findOne({ slug: slug });

  if (!folio) {
    res.status(404);
    throw new Error('Portfolio not found.');
  }

  // 2. This is the magic! Use .populate() to fetch the full user document
  //    that is linked by 'user_id' and exclude the password.
  await folio.populate({
    path: 'user_id',
    select: '-password' 
  });

  // 3. Send the complete object back (folio + populated user data)
  res.status(200).json(folio);
});

/**
 * @desc    Get the logged-in user's *own* folio details
 * @route   GET /api/v1/folio/me
 * @access  Private (Needs 'protect' middleware)
 */
export const getMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const folio = await Folio.findOne({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('You do not have a folio yet.');
  }

  res.status(200).json({ data: folio });
});

/**
 * @desc    Update the logged-in user's folio (template, colors, etc.)
 * @route   PATCH /api/v1/folio/me
 * @access  Private (Needs 'protect' middleware)
 */
export const updateMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { template_id, main_color, secondry_color, accent_color, font } = req.body;

  const folio = await Folio.findOne({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('Folio not found for this user.');
  }

  // Update only the fields that are sent
  folio.template_id = template_id || folio.template_id;
  // Uncomment these when you add them to your model
  // folio.main_color = main_color || folio.main_color;
  // folio.secondry_color = secondry_color || folio.secondry_color;
  // folio.accent_color = accent_color || folio.accent_color;
  // folio.font = font || folio.font;

  // We can't use saveUserAndRespond because it returns a User, not a Folio
  const updatedFolio = await folio.save();
  res.status(200).json({ data: updatedFolio });
});

/**
 * @desc    Delete the logged-in user's folio
 * @route   DELETE /api/v1/folio/me
 * @access  Private (Needs 'protect' middleware)
 */
export const deleteMyFolio = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  // 1. Find and delete the user's folio
  const folio = await Folio.findOneAndDelete({ user_id });

  if (!folio) {
    res.status(404);
    throw new Error('Folio not found for this user.');
  }

  // 2. CRITICAL: Remove the folio_id reference from the User document
  await User.findByIdAndUpdate(user_id, {
    $unset: { folio_id: 1 } // $unset removes the field entirely
  });

  res.status(200).json({ message: "Folio deleted successfully" });
});

export const checkSlugAvailability = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const folio = await Folio.findOne({ slug: slug }, '_id'); // Only check for existence

  res.status(200).json({ available: !folio });
});



// import { Folio } from "../model/folioModel.js";
// import { User } from "../model/userModel.js";

// export const getFolio = async (req, res) => {
//   const id = req.params.id;
//   const folio = await Folio.findOne({ user_id: id });
//   if (!folio) {
//     return res.status(404).json({ message: "Folio not found" });
//   }
//   res.status(200).json(folio);
// };

// export const createFolio = async (req, res) => {
//   const {
//     user_id,
//     template_id,
//     // main_color,
//     // secondry_color,
//     // accent_color,
//     // font,
//   } = req.body;
//   const existingFolio = await Folio.findOne({ user_id });
//   if (existingFolio) {
//     return res
//       .status(400)
//       .json({ message: "Folio already exists for this user" });
//   }
//   const folio = new Folio({
//     user_id,
//     template_id,
//     // main_color,
//     // secondry_color,
//     // accent_color,
//     // font,
//   });
//   await folio.save();
//   await User.findByIdAndUpdate(user_id, { folio_id: folio._id });
//   res.status(201).json(folio);
// };

// export const updateFolio = async (req, res) => {
//   const id = req.params.id;
//   const { template_id, main_color, secondry_color, accent_color, font } =
//     req.body;
//   const folio = await Folio.findOne({ user_id: id });
//   if (!folio) {
//     return res.status(404).json({ message: "Folio not found" });
//   }
//   folio.template_id = template_id || folio.template_id;
//   folio.main_color = main_color || folio.main_color;
//   folio.secondry_color = secondry_color || folio.secondry_color;
//   folio.accent_color = accent_color || folio.accent_color;
//   folio.font = font || folio.font;
//   await folio.save();
//   res.status(200).json(folio);
// };

// export const deleteFolio = async (req, res) => {
//   const id = req.params.id;
//   const folio = await Folio.findOneAndDelete({ user_id: id });
//   if (!folio) {
//     return res.status(404).json({ message: "Folio not found" });
//   }
//   res.status(200).json({ message: "Folio deleted successfully" });
// };
