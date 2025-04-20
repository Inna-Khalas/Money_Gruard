import { logoutUser, registerUser } from '../../services/auth.js';

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
