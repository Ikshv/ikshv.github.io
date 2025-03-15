// ws/wsServer.js
const WebSocket = require('ws');

function setupWebSocket(server) {
  // Create a WebSocket server on the same HTTP server at the '/ws' path
  const wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
      console.log('Received WebSocket message:', message);
      // Process or route the message as needed.
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}

module.exports = setupWebSocket;
