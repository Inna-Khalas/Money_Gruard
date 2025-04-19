import { registerUser } from '../../services/auth.js';

export const register = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
