export const saveUserAndRespond = async (user, res) => {
  const updatedUser = await user.save();
  res.status(200).json({
    data: updatedUser,
  });
};

export const pick = (source, fields) => {
  const result = {};
  for (const field of fields) {
    if (source?.[field] !== undefined) result[field] = source[field];
  }
  return result;
};
