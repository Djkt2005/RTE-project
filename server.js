import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getAIResponse } from './n.mjs'; // Import the AI function

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow CORS for all origins
app.use(express.static('public')); // Serve static files from 'public' folder

// Route to handle AI response
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
        return res.status(400).json({ error: 'Prompt cannot be empty.' });
    }

    try {
        const response = await getAIResponse(prompt);
        res.json({ response });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
