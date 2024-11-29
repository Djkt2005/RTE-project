document.addEventListener('DOMContentLoaded', async () => {
    const summaryBtn = document.getElementById('summary-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const summarySection = document.getElementById('summary-section');
    const chatbotSection = document.getElementById('chatbot-section');
    const summaryContainer = document.getElementById('summary-container');
    const chatDisplay = document.getElementById('chat-display');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    summaryContainer.innerHTML = '<p>Loading...</p>';

    function typewriterEffect(element, text, speed = 15) {
        element.innerHTML = '';
        const span = document.createElement('span');
        span.classList.add('typewriter-effect');
        element.appendChild(span);

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                span.textContent += text[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }

    const toggleSection = (sectionToShow, sectionToHide, activeButton, inactiveButton) => {
        sectionToShow.style.display = 'flex';
        sectionToHide.style.display = 'none';
        activeButton.classList.add('active');
        inactiveButton.classList.remove('active');
    };

    summaryBtn.addEventListener('click', () => {
        toggleSection(summarySection, chatbotSection, summaryBtn, chatbotBtn);
    });

    chatbotBtn.addEventListener('click', () => {
        toggleSection(chatbotSection, summarySection, chatbotBtn, summaryBtn);
    });

    const appendMessage = (sender, message) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.textContent = `${sender === 'user' ? 'You: ' : 'Bot: '}${message}`;
        chatDisplay.appendChild(messageDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    };

    sendBtn.addEventListener('click', async () => {
        const userInput = chatInput.value.trim();
        if (userInput === '') return;
        appendMessage('user', userInput);
        chatInput.value = '';

        try {
            const response = await fetch('http://localhost:3000/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch chatbot response");
            }

            const data = await response.json();
            appendMessage('bot', data.result);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            appendMessage('bot', "Sorry, I couldn't process that request.");
        }
    });

    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendBtn.click();
        }
    });

    try {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                summaryContainer.innerHTML = "<p>Error: No active tab found.</p>";
                return;
            }

            const url = tabs[0].url;

            if (!url) {
                console.error("Failed to get the URL of the active tab.");
                summaryContainer.innerHTML = "<p>Error: Unable to retrieve tab URL.</p>";
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/?url=${encodeURIComponent(url)}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch summary");
                }

                const summary = await response.text();
                typewriterEffect(summaryContainer, summary);
            } catch (error) {
                console.error("Error fetching summary:", error);
                summaryContainer.innerHTML = "<p>Error fetching summary.</p>";
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        summaryContainer.innerHTML = "<p>An unexpected error occurred.</p>";
    }

    toggleSection(summarySection, chatbotSection, summaryBtn, chatbotBtn);
});
