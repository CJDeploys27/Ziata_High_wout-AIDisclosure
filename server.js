import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// --- PATH CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Debugging: Print where the server thinks the website files are
console.log("------------------------------------------------");
console.log("SERVER STARTING");
console.log("Looking for website files in:", path.join(__dirname, 'dist'));
console.log("------------------------------------------------");

app.use(cors({ origin: '*' }));
app.use(express.json());

// --- API ROUTES ---
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "API_KEY_MISSING");

app.post('/api/chat', async (req, res) => {
  try {
    if (!apiKey) throw new Error("API Key is missing on Hostinger");
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: message }] }],
    });
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ reply: 'System Error: Check Server Logs' });
  }
});

// --- SERVE THE FRONTEND ---

// 1. Force Express to serve files from the 'dist' folder
// IMPORTANT: This must match the folder name created by 'npm run build'
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Catch-all: If file not found, send the index.html inside 'dist'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
