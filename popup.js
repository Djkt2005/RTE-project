document.getElementById("fetch-summary").addEventListener("click", async () => {
    const container = document.getElementById('summary-container');
    container.innerHTML = '<p>Loading...</p>';
    try {
        // Get the active tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            if (!tabs || tabs.length === 0) {
                console.error("No active tab found.");
                document.getElementById("summary").textContent = "Error: No active tab found.";
                return;
            }

            const url = tabs[0].url; // Get the URL of the active tab

            if (!url) {
                console.error("Failed to get the URL of the active tab.");
                document.getElementById("summary").textContent = "Error: Unable to retrieve tab URL.";
                return;
            }

            try {
                // Fetch the summary from the server
                const response = await fetch(`http://localhost:3000/?url=${encodeURIComponent(url)}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch summary");
                }

                const summary = await response.text();
                container.innerHTML = `<p>${summary}</p>`;
                document.getElementById("summary").textContent = summary;
            } catch (error) {
                console.error("Error fetching summary:", error);
                document.getElementById("summary").textContent = "Error fetching summary.";
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        document.getElementById("summary").textContent = "An unexpected error occurred.";
    }
});


