import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';

import router from './routers/index.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import authRouter from './routers/authRouter.js';  //  маршрути для логауту VB
import transactionsRouter from './routers/transactionsRouter.js';  //  маршрути для транзакцій VB

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

app.use('/api/auth', authRouter); // VB
app.use('/api', transactionsRouter); // VB


  app.use(router);
  app.use(/(.*)/, notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
}

export default serverStart;
