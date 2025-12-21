import express from 'express';
import cors from 'cors'; // Keep importing it, but we will add manual headers too
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// --- THE NUCLEAR FIX: MANUAL HEADERS ---
// This manually stamps the "VIP Pass" on every single response.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow ANYONE to connect
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // If the browser is just asking "Can I connect?", say YES immediately.
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// --- Debugging Route ---
// This lets you visit the URL in your browser to prove the server is alive.
app.get('/', (req, res) => {
  res.send('Ziata Backend is Running! (CORS Fixed)');
});

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('CRITICAL ERROR: GEMINI_API_KEY is missing.');
}
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
  console.log("Request received from:", req.get('origin')); // Log who is calling
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const response = await result.response;
    const reply = response.text();
    res.json({ reply });

  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ error: 'AI processing failed' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});