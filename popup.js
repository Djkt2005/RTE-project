document.addEventListener('DOMContentLoaded', () => {
    const summaryBtn = document.getElementById('summary-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const summarySection = document.getElementById('summary-section');
    const chatbotSection = document.getElementById('chatbot-section');

    // Event Listeners for Navigation Buttons
    summaryBtn.addEventListener('click', () => {
        summarySection.style.display = 'flex';
        chatbotSection.classList.remove('active');
        summaryBtn.classList.add('active');
        chatbotBtn.classList.remove('active');
    });

    chatbotBtn.addEventListener('click', () => {
        summarySection.style.display = 'none';
        chatbotSection.classList.add('active');
        chatbotBtn.classList.add('active');
        summaryBtn.classList.remove('active');

        // Check if iframe already exists, if not, add it
        if (!chatbotSection.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/27/16/20241127161406-FM1XTT2E.json";
            iframe.title = "Chatbot";
            chatbotSection.appendChild(iframe);
        }
    });
});