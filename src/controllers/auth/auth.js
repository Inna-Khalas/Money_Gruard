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
  
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  
  if (!token && req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  
  if (!token) {
    console.warn('No token found for logout, proceeding to clear cookies.');
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).json({ status: 'success', message: 'Logged out without token.' });
  }

  try {
    
    await logoutUser(res); 

    
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    
    return res.status(200).json({ status: 'success', message: 'User logged out successfully.' });
  } catch (error) {
    
    console.error('🚨 Logout error:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to log out.' });
  }
};
// ------

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
