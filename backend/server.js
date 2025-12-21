import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

// --- THE FIX: MANUAL HEADERS ONLY (No Library) ---
app.use((req, res, next) => {
  // 1. Force these headers onto EVERY response
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // 2. Intercept the browser's "Can I connect?" check immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // We send 200, not 204!
  }
  next();
});

app.use(express.json());

// --- PROOF OF LIFE ROUTE ---
app.get('/', (req, res) => {
  res.send('UPDATED: The CORS Fix is Live! (Status 200)'); 
});

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });
    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});