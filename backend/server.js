const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

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
  res.send('API is running (auth is handled by Supabase in the frontend)');
});

app.get('/api', (req, res) => {
  res.json({
    message: 'hello from API',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
