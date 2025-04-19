import { logoutUser } from '../../services/authServicelogout.js';

export const logout = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No active session found' });
  }

  await logoutUser(res);
  res.status(200).json({ status: 'success', message: 'User logged out' });
  res.status(500).json({ status: 'error', message: 'Failed to log out' });
};
