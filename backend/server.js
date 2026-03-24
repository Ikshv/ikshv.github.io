const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const usersStore = require('./lib/usersStore');

const app = express();
const PORT = process.env.PORT || 4000;

const JWT_SECRET =
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === 'production'
    ? null
    : 'dev-only-secret-change-for-production');

if (!JWT_SECRET) {
  console.error('Set JWT_SECRET in your environment for production.');
  process.exit(1);
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const defaultOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://ikshv.github.io',
  'https://www.isaacshvartsman.com',
  'https://isaacshvartsman.com',
];

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
  : defaultOrigins;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'hello from API',
    timestamp: new Date().toISOString(),
  });
});

function validateEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const result = usersStore.createUser({ email, passwordHash, role: 'client' });
    if (result.error) {
      return res.status(409).json({ error: result.error });
    }
    return res.status(201).json({ message: 'Account created' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = usersStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { email: user.email, role: user.role || 'client' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
