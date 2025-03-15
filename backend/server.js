// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Mount HTTP routes
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');

app.use('/', indexRoutes);   // Root routes
app.use('/api', apiRoutes);  // API routes

// Create HTTP server using the Express app
const server = http.createServer(app);

// Attach the WebSocket server on a dedicated path
const setupWebSocket = require('./ws/wsServer');
setupWebSocket(server);

// Start the HTTP server (with WebSocket attached)
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
