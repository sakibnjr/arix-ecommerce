import jwt from 'jsonwebtoken';

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, part) => {
    const [k, v] = part.split('=').map((s) => (s || '').trim());
    if (k) acc[k] = decodeURIComponent(v || '');
    return acc;
  }, {});
}

export function requireAdmin(req, res, next) {
  try {
    const auth = req.headers['authorization'] || '';
    let token = '';
    if (auth.toLowerCase().startsWith('bearer ')) {
      token = auth.slice(7).trim();
    }

    if (!token && req.headers.cookie) {
      const cookies = parseCookies(req.headers.cookie);
      token = cookies['admin_token'] || '';
    }

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.admin = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}


