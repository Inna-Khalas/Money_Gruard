



import { logoutUser } from '../services/authService.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js'; 
export const logout = ctrlWrapper(async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ status: 'error', message: 'No active session found' });
    }

    await logoutUser(res);  
    res.status(200).json({ status: 'success', message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to log out' });
  }
});
