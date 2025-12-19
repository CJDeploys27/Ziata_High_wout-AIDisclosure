import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();

app.use(cors({
  origin: 'https://YOUR-DOMAIN.com', // change to your Hostinger domain
}));
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not set');
}
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const reply = result.response.text();
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service temporarily unavailable' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});