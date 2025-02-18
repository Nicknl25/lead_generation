require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Connect to MongoDB 
mongoose .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, }) .then(() => console.log("MongoDB Connected")) .catch((err) => console.error("MongoDB Connection Error:", err));

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Test Route
app.post('/api/ai-test', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt is required" });

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7, // Adjust temperature for creativity
            max_tokens: 1000
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API Error:', error);
        res.status(500).json({ error: "Failed to process AI request" });
    }
});

// Test Route
app.get('/', (req, res) => {
    res.send('MERN Server is Running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
