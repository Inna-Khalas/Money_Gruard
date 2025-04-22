import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { updateUser } from '../services/auth.js';

export const getCurrentUser = async (req, res) => {
  const { _id, name, email, avatar } = req.user;
  res.json({ _id, name, email, avatar });
};

// Controller for updating a user by ID
export const patchUserController = async (req, res, next) => {
  const userId = req.params.id;
  const file = req.file;
  const updateData = { ...req.body };

  if (file) {
    const photoUrl =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);

    updateData.avatar = photoUrl;
  }

  const result = await updateUser(userId, updateData);

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a user!',
    data: result,
  });
};
