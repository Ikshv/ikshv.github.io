const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readUsers() {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function findByEmail(email) {
  const normalized = String(email).trim().toLowerCase();
  return readUsers().find((u) => u.email === normalized);
}

function createUser({ email, passwordHash, role }) {
  const users = readUsers();
  const normalized = String(email).trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) {
    return { error: 'Email already registered' };
  }
  users.push({
    email: normalized,
    passwordHash,
    role: role || 'client',
    createdAt: new Date().toISOString(),
  });
  writeUsers(users);
  return { ok: true };
}

module.exports = { readUsers, findByEmail, createUser };
