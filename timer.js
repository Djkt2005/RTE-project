// Create an alarm when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create("break-alarm", {
        delayInMinutes: 90, // Set the initial alarm after 90 minutes
        periodInMinutes: 90 // Repeat the alarm every 90 minutes
    });
});

// Listen for the alarm event
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "break-alarm") {
        // Show a notification when the alarm triggers
        chrome.notifications.create({
            type: "basic",
            title: "Time for a Break!",
            message: "Take a short break to rest your eyes and mind.",
            iconUrl: "icons/icon-48.png" // Replace with the path to your icon
        });
    }
});
