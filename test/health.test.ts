import request from 'supertest';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from '../config/env.js';
import { rateLimiter } from '../src/lib/rate-limit.js';
import { router } from '../src/routes/index.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGINS.split(',') }));
app.use(rateLimiter);
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));
app.use('/api', router);

describe('health', () => {
  it('should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
