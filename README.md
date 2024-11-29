# FocusEdge 🌟  

FocusEdge is a feature-rich Chrome Extension designed to **supercharge your productivity** and streamline your browsing experience. By combining intelligent summarization 📖, AI chatbot 🤖, ad-blocking 🚫, and a break timer ⏰, FocusEdge ensures you stay focused, organized, and efficient while working online.  

---

## Features ✨  

### 1. **Website Summarizer 📚**  
- Extracts meaningful content from web pages and generates concise summaries.  
- Saves time ⏳ by providing key information at a glance without wading through clutter.  
- Powered by **Google Generative AI** for top-notch summaries.  

### 2. **AI-Powered Chatbot 🤖**  
- Have real-time, intelligent conversations with an AI chatbot.  
- Ask questions about summarized content or general topics 🌐.  
- Chatbot responses are contextual, giving you meaningful insights.  

### 3. **Ad Blocking with Custom Rules 🚫**  
- Blocks annoying ads and trackers, providing a cleaner, distraction-free browsing experience.  
- Uses pre-configured rules to block domains like `doubleclick.net` and `googleadservices.com`.  
- Fully customizable for additional filtering 🛠️.  

### 4. **Break Timer ⏰**  
- Promotes healthy work habits by encouraging regular breaks 🧘‍♂️.  
- Displays a dynamic countdown timer directly on the extension badge 🎯.  
- Notifies you when it’s time to step away and refresh your mind 🍵.  

### 5. **Seamless Integration 🚀**  
- Simple and intuitive popup interface with quick navigation.  
- Toggle effortlessly between summarization 📖 and chatbot features 🤝.  
- Works within your browser, ensuring zero disruption to your workflow.  

---

## How It Works 🛠️  

1. **Website Summarizer**  
   - Click the "Summary" tab to analyze and summarize the active tab's content 📋.  
   - The extension uses **Puppeteer** to extract text and **Google Generative AI** to create summaries.
   -  ![2](https://github.com/user-attachments/assets/a03b0d67-f9d3-498c-abdd-71968a34250f)


2. **Chatbot Interaction**  
   - Switch to the "Chatbot" tab for an AI-powered conversation 💬.  
   - Submit your queries and get intelligent responses based on the page content or external context.
   -   ![1](https://github.com/user-attachments/assets/50428ef2-c83a-410a-9ed1-890882bd587c)


3. **Ad Blocking**  
   - Preloaded rules in `rules.json` block intrusive ads 🚫, improving browsing speed and focus.
   - ![4](https://github.com/user-attachments/assets/b6259761-e221-40ce-b41e-634b9c063088)


4. **Break Timer**  
   - Automatically starts a 90-minute countdown 🕒 when activated.  
   - Updates the badge dynamically and notifies you when your break begins.
   - ![3](https://github.com/user-attachments/assets/f14027c5-0d98-4195-a4b3-1016ee05f325)


---

## Technologies Used 💻  

- **Chrome Extensions API**: Core functionality and browser integration.  
- **Puppeteer**: For content scraping and extraction 🕸️.  
- **Google Generative AI**: Summarization and chatbot intelligence 🤖.  
- **Node.js with Express**: Backend API for summarization and chatbot services 🌐.  
- **HTML, CSS, and JavaScript**: Interactive frontend and popup interface 🎨.  

---

## Getting Started 🚀  

1. Clone the repository 🗂️.  
2. Install backend dependencies:  
   ```bash  
   npm install  
   ```  
3. Create a `.env` file for environment variables:  
   ```env  
   API_KEY=your-google-generative-ai-key  
   ```  
4. Start the backend server 🖥️:  
   ```bash  
   node summarizer.mjs  
   ```  
5. Load the extension:  
   - Go to `chrome://extensions/` 🔧.  
   - Enable "Developer mode" and click "Load unpacked."  
   - Select the folder containing `manifest.json`.  

---

## Inspiration and Resources 🌟  

FocusEdge draws inspiration from various tutorials and resources to bring a **blend of cutting-edge features** into one cohesive solution.  

### References 🔗  
- [Learn Web Extensions 📹](https://youtube.com/playlist?list=PLC3y8-rFHvwg2-q6Kvw3Tl_4xhxtIaNlY)  
- [Building AI Chatbots 🤖](https://youtu.be/Z8F6FvMrN4o)  
- [Introduction to Puppeteer 🕸️](https://youtu.be/XVv6mJpFOb0)  
- [Timer with Chrome Extensions ⏰](https://youtu.be/mBoX_JCKZTE)  
- [Notifications in Chrome Extensions 🔔](https://youtu.be/wqRKEd0_suw)  
- And more exciting tutorials included in the [resources list](#).  

---

## Future Plans 🚀  

- Advanced filtering for more robust ad-blocking 🚫.  
- Integration of **advanced AI models** for better chatbot accuracy 🤖.  
- Multi-language support 🌍 for summaries and chatbot responses.  
- Calendar synchronization for smarter break management 📅.  

---

## Contributors 🤝  

This project was crafted with care and dedication by:  

- **Krishant Tanti**  
- **Om Sharma**  
- **Darshit Sengra**  
- **Yug Ramoliya**  

FocusEdge: Your ultimate productivity companion to stay focused, informed, and efficient! ✨ 🚀 🌟  
