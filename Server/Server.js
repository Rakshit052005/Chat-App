require('dotenv').config();
const WebSocket = require('ws');
const axios = require('axios');

const server = new WebSocket.Server({ port: 8081 });

server.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', async rawMessage => {
    const message = rawMessage.toString().trim(); // ✅ ensure it's a clean string
    console.log(`Received: ${message}`);
    socket.send(`🤖 Thinking...`);

    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      socket.send(reply);
    } catch (err) {
      console.error('AI error:', err.response?.data || err.message);
      socket.send(`❌ AI couldn't respond: ${err.response?.data?.error?.message || err.message}`);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('✅ WebSocket server running at ws://localhost:8081');
