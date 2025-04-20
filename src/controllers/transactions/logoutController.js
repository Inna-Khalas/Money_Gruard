import { logoutUser } from '../../services/authServicelogout.js';  
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';   // поправил импорт (Андрей)

export const logout = ctrlWrapper(async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({ status: 'error', message: 'No active session found' });
    }

    await logoutUser(res);  
    res.status(200).json({ status: 'success', message: 'User logged out' });
  } catch (error) {
    console.log(error); // долбавил лог еррора чтоб файл не краснел (Андрей)
    res.status(500).json({ status: 'error', message: 'Failed to log out' });
  }
});
