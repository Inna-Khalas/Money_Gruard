export const getCurrentUser = async (req, res) => {
  const { _id, name, email } = req.user;
  res.json({ _id, name, email });
};
