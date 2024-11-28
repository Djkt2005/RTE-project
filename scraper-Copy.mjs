import puppeteer from 'puppeteer';

async function start() {
    try {
        const browser = await puppeteer.launch({ headless: true, slowMo: 50 });
        const page = await browser.newPage();

        //  webpage
        await page.goto("https://en.wikipedia.org/wiki/Counter-Strike:_Global_Offensive", { waitUntil: 'domcontentloaded' });

        // Scrape the paragraphs from the page
        const paragraphs = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('div.mw-parser-output p'));
            return paragraphs.map(p => p.textContent.trim()).filter(text => text.length > 0);
        });

        console.log("Content successfully extracted.");

        await browser.close();
        return paragraphs.join("\r\n"); 
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
}

export { start }; // Export the function
