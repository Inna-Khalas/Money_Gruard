import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';

import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

function serverStart() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.send({
      message: 'Hey',
    });
  });

  app.use(router);

  app.use('/api-docs', swaggerDocs());

  app.use(/(.*)/, notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
}

export default serverStart;
