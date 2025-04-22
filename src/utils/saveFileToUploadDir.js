import path from 'node:path';
import fs from 'node:fs/promises';
import { UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  const tempPath = file.path;
  const fileName = path.basename(tempPath);
  const targetPath = path.join(UPLOAD_DIR, fileName);

  await fs.rename(tempPath, targetPath);

  return `/uploads/${fileName}`;
};
