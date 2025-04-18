import { initMongoConnection } from './db/initMongoConnections.js';
import serverStart from './server.js';

export const boostrap = async () => {
  await initMongoConnection();
  serverStart();
};

boostrap();
