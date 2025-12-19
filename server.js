import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION FOR ES MODULES (Fixes "__dirname" issues) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// 1. Allow Hostinger to talk to this server (CORS)
app.use(cors({
  origin: '*', 
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// 2. Allow the server to read JSON data
app.use(express.json());

// 3. Initialize the AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('CRITICAL ERROR: GEMINI_API_KEY is not set in Environment Variables!');
}
const genAI = new GoogleGenerativeAI(apiKey);

// 4. The Chat Route (The Brain)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Error: Message is invalid.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });

    const reply = result.response.text();
    res.json({ reply }); 

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: 'My brain is offline momentarily. Please try again.' });
  }
});

// -------------------------------------------------------------------------
// 6. SERVE THE FRONTEND (The Body) - NEW SECTION
// -------------------------------------------------------------------------

// Tell Express to serve the static files from the "dist" folder (where Vite builds your site)
app.use(express.static(path.join(__dirname, 'dist')));

// The "Catch-All" Route:
// If the user goes to a page like /about or refreshes the page, send them index.html
// This MUST be the last route in the file!
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// -------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
