import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { Request, Response, NextFunction } from 'express';

const limiter = new RateLimiterMemory({ points: 100, duration: 60 });

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  limiter
    .consume(req.ip || 'global')
    .then(() => next())
    .catch(() => res.status(429).json({ error: 'too_many_requests' }));
}
