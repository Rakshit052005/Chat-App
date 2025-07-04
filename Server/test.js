require('dotenv').config();
const axios = require('axios');

axios.post('https://api.groq.com/openai/v1/chat/completions', {
  model: 'llama3-8b-8192',
  messages: [{ role: 'user', content: 'Hello!' }]
}, {
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(res => console.log('✅ AI says:', res.data.choices[0].message.content))
.catch(err => console.error('❌ Error:', err.response?.data || err.message));
