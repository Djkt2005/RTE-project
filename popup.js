// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Get all views
    const mainView = document.getElementById("main-view");
    const summarizeView = document.getElementById("summarize-view");
    const questionView = document.getElementById("question-view");

    // Get buttons
    const summarizeButton = document.getElementById("summarize-button");
    const askQuestionButton = document.getElementById("ask-question-button");
    const backFromSummarize = document.getElementById("back-from-summarize");
    const backFromQuestion = document.getElementById("back-from-question");
    const submitQuestion = document.getElementById("submit-question");

    // Show summarize view
    summarizeButton.addEventListener("click", () => {
        mainView.classList.add("hidden");
        summarizeView.classList.remove("hidden");
    });

    // Show question view
    askQuestionButton.addEventListener("click", () => {
        mainView.classList.add("hidden");
        questionView.classList.remove("hidden");
    });

    // Go back to main view from summarize
    backFromSummarize.addEventListener("click", () => {
        summarizeView.classList.add("hidden");
        mainView.classList.remove("hidden");
    });

    // Go back to main view from question
    backFromQuestion.addEventListener("click", () => {
        questionView.classList.add("hidden");
        mainView.classList.remove("hidden");
    });

    // Handle submit question (placeholder functionality)
    submitQuestion.addEventListener("click", () => {
        const questionInput = document.getElementById("question-input").value.trim();
        const answerBox = document.getElementById("answer-box");

        if (questionInput) {
            answerBox.innerHTML = `<p>Your question was: "${questionInput}". This is a placeholder response.</p>`;
        } else {
            answerBox.innerHTML = `<p>Please enter a question.</p>`;
        }
    });
});
