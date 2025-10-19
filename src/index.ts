import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { rateLimiter } from './lib/rate-limit.js';
import { env } from '../config/env.js';
import { router } from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));

app.use(cors({ origin: env.CORS_ORIGINS.split(',') }));
app.use(rateLimiter);

app.use(
  pinoHttp({
    messageKey: 'message',
    customLogLevel: (res, err) => (err || res.statusCode >= 500 ? 'error' : 'info'),
  }),
);

app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api', router);

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: status >= 500 ? 'internal_error' : err.message });
});

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${env.PORT}`);
});
