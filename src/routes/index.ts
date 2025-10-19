import { Router } from 'express';
import { z } from 'zod';

export const router = Router();

router.get('/v1/hello', (_req, res) => {
  res.json({ message: 'hello world' });
});

const EchoDto = z.object({ text: z.string().min(1) });
router.post('/v1/echo', (req, res) => {
  const parsed = EchoDto.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid_body' });
  res.json({ echo: parsed.data.text });
});
