let seenNotificationIds = new Set();

document.addEventListener("DOMContentLoaded", async () => {
    await registerNotificationSupport();

    const enableBtn = document.getElementById("enableNotificationsBtn");
    const status = document.getElementById("notificationStatus");

    if (enableBtn) {
        enableBtn.addEventListener("click", async () => {
            if (!("Notification" in window)) {
                status.textContent = "Browser notifications are not supported.";
                return;
            }

            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                status.textContent = "Notifications enabled.";
                localStorage.setItem("dernNotificationsEnabled", "true");
            } else {
                status.textContent = "Permission denied.";
                localStorage.setItem("dernNotificationsEnabled", "false");
            }
        });
    }

    await loadNotifications(true);
    setInterval(() => loadNotifications(false), 5000);
});

async function registerNotificationSupport() {
    if ("serviceWorker" in navigator) {
        try {
            await navigator.serviceWorker.register("/sw.js");
        } catch (e) {
            console.error("Service worker registration failed:", e);
        }
    }
}

async function loadNotifications(initialLoad) {
    const container = document.getElementById("notificationList");

    try {
        const response = await fetch("/api/notifications/me");
        const data = await response.json();

        if (!response.ok) {
            container.innerHTML = `<p>${data.message || "Failed to load notifications"}</p>`;
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "<p>No notifications yet.</p>";
            return;
        }

        container.innerHTML = data.map(item => `
            <div class="request-card">
                <p><strong>${item.title}</strong></p>
                <p>${item.message}</p>
                <p><small>${item.createdAt || ""}</small></p>
                ${item.latitude != null && item.longitude != null
            ? `<a target="_blank" href="https://www.google.com/maps?q=${item.latitude},${item.longitude}">Open Location</a>`
            : ""
        }
            </div>
        `).join("");

        if (!initialLoad) {
            for (const item of data) {
                if (!seenNotificationIds.has(item.id)) {
                    seenNotificationIds.add(item.id);
                    await showBrowserNotification(item.title, item.message);
                }
            }
        } else {
            data.forEach(item => seenNotificationIds.add(item.id));
        }

    } catch (error) {
        console.error("Notification load error:", error);
        container.innerHTML = "<p>Failed to load notifications.</p>";
    }
}

async function showBrowserNotification(title, body) {
    if (localStorage.getItem("dernNotificationsEnabled") !== "true") return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    if ("serviceWorker" in navigator) {
        const reg = await navigator.serviceWorker.ready;
        await reg.showNotification(title, {
            body,
            requireInteraction: true
        });
    } else {
        new Notification(title, { body });
    }
}