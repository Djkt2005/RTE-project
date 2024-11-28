document.addEventListener('DOMContentLoaded', async () => {
    const summaryBtn = document.getElementById('summary-btn');
    const chatbotBtn = document.getElementById('chatbot-btn');
    const summarySection = document.getElementById('summary-section');
    const chatbotSection = document.getElementById('chatbot-section');
    const summaryContainer = document.getElementById('summary-container'); // The container to display the summary
    summaryContainer.innerHTML = '<p>Loading...</p>';

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

    try {
        // Get the active tab's URL
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

                const summary = await response.text();
                summaryContainer.innerHTML = `<p>${summary}</p>`;
            } catch (error) {
                console.error("Error fetching summary:", error);
                summaryContainer.innerHTML = "<p>Error fetching summary.</p>";
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        summaryContainer.innerHTML = "<p>An unexpected error occurred.</p>";
    }
});
