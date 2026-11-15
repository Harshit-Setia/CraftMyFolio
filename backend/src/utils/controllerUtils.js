export const saveUserAndRespond = async (user, res) => {
  const updatedUser = await user.save();
  res.status(200).json({
    data: updatedUser,
  });
};