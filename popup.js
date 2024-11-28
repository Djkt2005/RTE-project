document.addEventListener('DOMContentLoaded', () => {
    const summaryBtn = document.getElementById('summary-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const summarySection = document.getElementById('summary-section');
    const chatbotSection = document.getElementById('chatbot-section');

    // Event Listeners for Navigation Buttons
    summaryBtn.addEventListener('click', () => {
        summarySection.classList.remove('hidden');
        chatbotSection.classList.add('hidden');
        summaryBtn.classList.add('active');
        chatbotBtn.classList.remove('active');
    });

    chatbotBtn.addEventListener('click', () => {
        chatbotSection.classList.remove('hidden');
        summarySection.classList.add('hidden');
        chatbotBtn.classList.add('active');
        summaryBtn.classList.remove('active');
    });
});
