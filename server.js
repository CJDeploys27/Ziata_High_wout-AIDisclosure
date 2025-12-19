import express from 'express';
import cors from 'cors'; // You need this for Hostinger to talk to Cloud Run
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = process.env.PORT || 8080;

// 1. Allow Hostinger to talk to this server (CORS)
// Replace the URL below with your actual Hostinger Domain if different
app.use(cors({
  origin: '*', // For debugging, '*' allows all. Ideally, put your Hostinger URL here: 'https://lightyellow-gaur-745651.hostingersite.com'
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// 2. Allow the server to read JSON data (Crucial for the chat message)
app.use(express.json());

// 3. Initialize the AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('CRITICAL ERROR: GEMINI_API_KEY is not set in Cloud Run Environment Variables!');
}
const genAI = new GoogleGenerativeAI(apiKey);

// 4. THE MISSING PIECE: The Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Error: Message is invalid.' });
    }

    // AI Logic
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const reply = result.response.text();
    res.json({ reply }); // Send the answer back to Hostinger

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: 'My brain is offline momentarily. Please try again.' });
  }
});

// 5. Basic Health Check (Optional, but good to have)
app.get('/', (req, res) => {
  res.send('Ziata Backend is Running!');
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
