document.addEventListener('DOMContentLoaded', async () => {
    const summaryBtn = document.getElementById('summary-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const summarySection = document.getElementById('summary-section');
    const chatbotSection = document.getElementById('chatbot-section');
    const summaryContainer = document.getElementById('summary-container'); // The container to display the summary
    summaryContainer.innerHTML = '<p>Loading...</p>';

    let summaryText = "";
    // Function to add typewriter effect
    function typewriterEffect(element, text, speed = 15) { // Faster typing speed
        element.innerHTML = ''; // Clear the container
        const span = document.createElement('span');
        span.classList.add('typewriter-effect');
        element.appendChild(span);

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                span.textContent += text[i];
                i++;
            } else {
                clearInterval(interval); // Stop typing when complete
            }
        }, speed);
    }

    // Event Listeners for Navigation Buttons
    summaryBtn.addEventListener('click', () => {
        summarySection.style.display = 'flex';
        chatbotSection.style.display = 'none';
        summaryBtn.classList.add('active');
        chatbotBtn.classList.remove('active');
    });

    chatbotBtn.addEventListener('click', () => {
        summarySection.style.display = 'none';
        chatbotSection.style.display = 'block';
        chatbotBtn.classList.add('active');
        summaryBtn.classList.remove('active');

        // Check if iframe already exists, if not, add it
        if (!chatbotSection.querySelector('iframe')) {
            const iframe = document.createElement('iframe');
            iframe.src = "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/27/16/20241127161406-FM1XTT2E.json";
            iframe.title = "Chatbot";
            iframe.style.width = "100%";
            iframe.style.height = "500px";
            chatbotSection.appendChild(iframe);
        }
    });

    // Fetch the summary of the active tab
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                summaryContainer.innerHTML = "<p>Error: No active tab found.</p>";
                return;
            }

            const url = tabs[0].url; // Get the URL of the active tab

            if (!url) {
                console.error("Failed to get the URL of the active tab.");
                summaryContainer.innerHTML = "<p>Error: Unable to retrieve tab URL.</p>";
                return;
            }

            try {
                // Fetch the summary from the server
                const response = await fetch(`http://localhost:3000/?url=${encodeURIComponent(url)}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch summary");
                }

                summaryText = await response.text(); // Store the summary globally
                typewriterEffect(summaryContainer, summaryText); // Apply typewriter effect
            } catch (error) {
                console.error("Error fetching summary:", error);
                summaryContainer.innerHTML = "<p>Error fetching summary.</p>";
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        summaryContainer.innerHTML = "<p>An unexpected error occurred.</p>";
    }

    // AI Prompt Interaction
    const API_BASE_URL = 'http://localhost:3000'; // Correct backend URL

    document.getElementById('sendPrompt').addEventListener('click', async () => {
        const userInput = document.getElementById('userInput').value;
        const responseDiv = document.getElementById('response');

        if (!userInput.trim()) {
            responseDiv.innerText = "Please enter a prompt.";
            return;
        }

        responseDiv.innerText = "Generating response...";

        try {
            const response = await fetch(`${API_BASE_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    prompt: `${summaryText}\n\nUser's Query: ${userInput}` // Include summary in the prompt
                })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                responseDiv.innerText = `Error: ${data.error}`;
            } else {
                typewriterEffect(responseDiv, data.response); // Apply typewriter effect for AI response
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
            responseDiv.innerText = "Error fetching AI response.";
        }
    });
});