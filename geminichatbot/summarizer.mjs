import puppeteer from 'puppeteer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'chrome-extension://bgbjaioohfgjpcilocjglaheaimpfifn', // Allow your Chrome extension's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// Puppeteer Function to Scrape Text
async function start(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Scrape the paragraphs from the page
        const paragraphs = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('strong,b,em,i,span,div,body,h1,h2,h3,h4,h5,h6,p,article,a'));
            return elements.map(p => p.textContent.trim()).filter(text => text.length > 0);
        });

        console.log("Content successfully extracted.");
        await browser.close();

        return paragraphs.join(" "); // Return extracted text as a single string
    } catch (error) {
        console.error("Error occurred in Puppeteer:", error);
        return null;
    }
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Function to Generate AI Response
async function getAIResponse(prompt) {
    try {

        const result = await model.generateContent({
            prompt,
        });

        return result.response.text(); // Return AI response
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
}

// Root Route: Scrape and Summarize Content
app.get('/', async (req, res) => {
    try {
        const url = req.query.url; // URL passed as a query parameter
        if (!url) {
            res.status(400).send("Please provide a URL as a query parameter.");
            return;
        }

        const extractedText = await start(url);

        if (!extractedText) {
            res.status(500).send("Failed to extract text.");
            return;
        }

        const prompt = `Summarize this content:\n\n${extractedText}`;
        const summary = await getAIResponse(prompt);

        res.send(summary); // Send the AI-generated summary to the client
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Internal Server Error");
    }
});
// POST Route: Generate Response with Custom Prompt
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim() === '') {
            return res.status(400).json({ error: 'Prompt cannot be empty.' });
        }

        const response = await getAIResponse(prompt); // Pass the combined prompt directly
        res.json({ response });
    } catch (error) {
        console.error("Error in POST /api/generate:", error);
        res.status(500).json({ error: "Failed to generate AI response." });
    }
});


// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
