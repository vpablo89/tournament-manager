import cors from 'cors';
import express from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { Controllers, createRoutes } from '../routes';

export function createApp(controllers: Controllers, frontendOrigin: string) {
  const app = express();
  app.use(cors({ origin: frontendOrigin }));
  app.use(express.json());
  app.use(createRoutes(controllers));
  app.use(errorHandler);
  return app;
}
