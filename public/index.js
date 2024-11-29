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
            body: JSON.stringify({ prompt: userInput })
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            responseDiv.innerText = `Error: ${data.error}`;
        } else {
            responseDiv.innerText = data.response;
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        responseDiv.innerText = "Error fetching AI response.";
    }
});
