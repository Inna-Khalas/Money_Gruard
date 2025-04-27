import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../../services/auth.js';
import { setUpSession } from '../../utils/setUpSession.js';

export const registerUserController = async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await registerUser(name, email, password);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setUpSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};
// ------
export const logoutUserController = async (req, res) => {
  // 🎯 Попытка взять токен из заголовка Authorization
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 🎯 Если в заголовке нет — пробуем из куков
  if (!token && req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No active session found' });
  }

  try {
    await logoutUser(res); // чистим куки
    res.clearCookie('access_token'); // 🎯 Явная очистка на всякий
    res.clearCookie('refresh_token');
    return res.status(200).json({ status: 'success', message: 'User logged out' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to log out' });
  }
};
//-----
export const refreshSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.body;
  const session = await refreshSession({
    sessionId,
    refreshToken,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    },
  });
};
