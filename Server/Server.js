// Server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', message => {
    console.log(`Received: ${message}`);
    socket.send(`You said: ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');

// Simple client for testing
setTimeout(() => {
  const client = new WebSocket('ws://localhost:8080');

  client.on('open', () => {
    console.log('Client connected to server');
    client.send('Hello from client');
  });

  client.on('message', (msg) => {
    console.log(`Server replied: ${msg}`);
    client.close();
  });

  client.on('close', () => {
    console.log('Client disconnected');
  });
}, 1000); // wait for server to start
