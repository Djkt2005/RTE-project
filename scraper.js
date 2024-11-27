const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    try {
        const browser = await puppeteer.launch({ headless: true, slowMo: 50 }); 
        const page = await browser.newPage();

        await page.goto("https://en.wikipedia.org/wiki/Python_(programming_language)", { waitUntil: 'domcontentloaded' });

        const paragraphs = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('div.mw-parser-output p'));
            return paragraphs.map(p => p.textContent.trim()).filter(text => text.length > 0);
        });

        // Save extracted text to the file
        await fs.writeFile("names.txt", paragraphs.join("\r\n"));

        console.log("Content successfully extracted and saved to names.txt");

        await browser.close();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

start();
