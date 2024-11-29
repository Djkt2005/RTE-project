import puppeteer from 'puppeteer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: 'chrome-extension://bgbjaioohfgjpcilocjglaheaimpfifn',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let extractedTextContext = '';

async function start(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const allText = await page.evaluate(() => {
            const elements = [...document.querySelectorAll('div.mw-parser-output p')];
            return elements.map(el => el.textContent.trim()).filter(text => text.length > 0);
        });

        await browser.close();
        return allText.join("\r\n");
    } catch (error) {
        console.error("Error occurred in Puppeteer:", error);
        return null;
    }
}

app.get('/', async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            res.status(400).send("Please provide a URL as a query parameter.");
            return;
        }

        const extractedText = await start(url);

        if (!extractedText) {
            res.status(500).send("Failed to extract text.");
            return;
        }

        extractedTextContext = extractedText;

        const prompt = "Summarize this:\r\n" + extractedText;
        const result = await model.generateContent(prompt);

        res.send(result.response.text());
    } catch (error) {
        console.error("Error in GET /:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/content', async (req, res) => {
    try {
        const { question } = req.body;

        if (!extractedTextContext) {
            res.status(400).json({ error: "No extracted content available. Please extract content first." });
            return;
        }

        const prompt = `Based on the following content:\r\n"${extractedTextContext}"\r\nAnswer this question:\r\n${question}`;
        const result = await model.generateContent(prompt);

        res.json({ result: result.response.text() });
    } catch (error) {
        console.error("Error in POST /api/content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
