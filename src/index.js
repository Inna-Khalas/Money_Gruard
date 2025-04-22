import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnections.js';
import serverStart from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

export const boostrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  serverStart();
};

boostrap();
