import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30, // 30 attempts per window
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, (req, res) => {
  const { username = '', password = '' } = req.body || {};
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) {
    return res.status(500).json({ error: 'Server auth not configured' });
  }
  if (username !== expectedUser || password !== expectedPass) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: 'Missing JWT secret' });

  const token = jwt.sign({ sub: username, role: 'admin' }, secret, { expiresIn: '4h' });
  return res.json({ token });
});

export default router;


