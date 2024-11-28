
import { GoogleGenerativeAI } from "@google/generative-ai";
import { start } from './scraper-Copy.mjs';

(async () => {
    try {
        const extractedText = await start();

        if (!extractedText) {
            console.error("Failed to extract text.");
            return;
        }

        const genAI = new GoogleGenerativeAI("AIzaSyBan03wvogY0057ylELa7tR9mZUHgxEdnc");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Summarize this:\r\n" + extractedText;

        const result = await model.generateContent(prompt);

        console.log("AI Response:", result.response.text());
    } catch (error) {
        console.error("Error:", error);
    }
})();
