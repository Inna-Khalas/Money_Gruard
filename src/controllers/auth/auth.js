import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../../services/auth.js';
// import { setUpSession } from '../../utils/setUpSession.js';

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

  const { accessToken, refreshToken, sessionId } = session;

  // setUpSession(res, { accessToken, refreshToken });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
      refreshToken,
      sessionId,
    },
  });
};

export const logoutUserController = async (req, res) => {
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
      sessionId: session.sessionId,
    },
  });
};
