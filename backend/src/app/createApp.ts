import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from '../middlewares/errorHandler';
import { Controllers, createRoutes } from '../routes';

export function createApp(controllers: Controllers, frontendOrigin: string) {
  const app = express();
  app.use(cors({ origin: frontendOrigin }));
  app.use(express.json());

  const openApiPath = path.join(process.cwd(), 'docs', 'openapi.json');
  if (fs.existsSync(openApiPath)) {
    const spec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  app.use(createRoutes(controllers));
  app.use(errorHandler);
  return app;
}
