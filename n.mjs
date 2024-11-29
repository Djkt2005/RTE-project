import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Generative AI API
const apiKey = "AIzaSyBan03wvogY0057ylELa7tR9mZUHgxEdnc";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getAIResponse(prompt) {
    try {
        const result = await model.generateContent(prompt);
        return result.response.text(); // Return AI response
    } catch (error) {
        console.error("Error:", error);
        return "Error occurred while generating AI response.";
    }
}
