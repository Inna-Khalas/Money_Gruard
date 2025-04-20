export const getCurrentUser = async (req, res) => {
    try {
      const { _id, name, email } = req.user;
      res.json({ _id, name, email });
    } catch (error) {
      res.status(500).json({ message: 'Failed to get user data' });
    }
  };