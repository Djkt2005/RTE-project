// Create an alarm when the extension is installed or restarted
chrome.runtime.onInstalled.addListener(() => {
    // Set an alarm to trigger every second
    chrome.alarms.create("timer-update", { periodInMinutes: 1 / 60 }); // Every second
    // Store the countdown end time
    const endTime = Date.now() + 90 * 60 * 1000; // 90 minutes from now
    chrome.storage.local.set({ endTime });
});

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "timer-update") {
        // Get the stored end time
        chrome.storage.local.get("endTime", ({ endTime }) => {
            if (!endTime) return;

            const remainingTime = endTime - Date.now();

            if (remainingTime <= 0) {
                // Time is up; clear the badge and reset
                chrome.action.setBadgeText({ text: "" });
                chrome.notifications.create({
                    type: "basic",
                    title: "Break Timer",
                    message: "Time's up! Take a break.",
                    iconUrl: "icons/icon-48.png", // Replace with your icon
                });
                // Optionally reset the timer
                chrome.storage.local.set({ endTime: Date.now() + 90 * 60 * 1000 }); // Restart 90 minutes
            } else {
                // Calculate minutes and seconds left
                const minutes = Math.floor(remainingTime / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                // Update the badge text with the remaining time
                chrome.action.setBadgeText({
                    text: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
                });
                chrome.action.setBadgeBackgroundColor({ color: "#ff5722" }); // Badge color
            }
        });
    }
});
