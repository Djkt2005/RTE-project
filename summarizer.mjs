import puppeteer from 'puppeteer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'chrome-extension://bgbjaioohfgjpcilocjglaheaimpfifn', // Allow your Chrome extension's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const apiKey = process.env.API_KEY;

// Puppeteer Function
async function start(url) {
    try {
        const browser = await puppeteer.launch({ headless: true, slowMo: 50 });
        const page = await browser.newPage();

        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // Scrape the paragraphs from the page
        const paragraphs = await page.evaluate(() => {
            const elements = Array.from(document.querySelectorAll('body'));
            return elements.map(p => p.textContent.trim()).filter(text => text.length > 0);
        });

        console.log("Content successfully extracted.");
        await browser.close();

        return paragraphs.join("\r\n");
    } catch (error) {
        console.error("Error occurred in Puppeteer:", error);
        return null;
    }
}

// Root Route to Scrape and Summarize Content
app.get('/', async (req, res) => {
    try {
        const url = req.query.url; // URL should be passed as a query parameter
        if (!url) {
            res.status(400).send("Please provide a URL as a query parameter.");
            return;
        }

        const extractedText = await start(url);

        if (!extractedText) {
            res.status(500).send("Failed to extract text.");
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Summarize this:\r\n" + extractedText;
        const result = await model.generateContent(prompt);

        console.log("AI Response:", result.response.text());
        res.send(result.response.text()); // Send summary to the client
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Internal Server Error");
    }
});

// POST Route for Custom Queries
app.post('/api/content', async (req, res) => {
    try {
        const { question } = req.body;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Answer this:\r\n${question}`;
        const result = await model.generateContent(prompt);

        console.log("Custom Query Response:", result.response.text());
        res.json({ result: result.response.text() });
    } catch (error) {
        console.error("Error in POST /api/content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
