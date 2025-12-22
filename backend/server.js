const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
console.log("Server starting. Key available:", apiKey ? "YES (" + apiKey.substring(0,4) + "...)" : "NO");

const genAI = new GoogleGenerativeAI(apiKey || "-");

app.post('/api/chat', async (req, res) => {
  try {
    if (!apiKey) throw new Error("API Key is missing from Environment Variables.");

    const { message } = req.body;
    
    // Use gemini-2.0-flash-exp (latest model as of Dec 2024)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error("CRASH REPORT:", err);
    res.status(500).json({ 
      error: "Backend Crash", 
      details: err.message
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
