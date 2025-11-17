/**
 * Saves a Mongoose user document and sends the updated user
 * as a standardized JSON response.
 * @param {object} user - The Mongoose user document to save.
 * @param {object} res - The Express response object.
 */
export const saveUserAndRespond = async (user, res) => {
  const updatedUser = await user.save();
  res.status(200).json({
    data: updatedUser,
  });
};