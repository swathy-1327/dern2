document.addEventListener("DOMContentLoaded", async () => {
    const ok = await checkVolunteerAuth();
    if (!ok) return;

    loadActiveRequests();
    setInterval(loadActiveRequests, 10000);
});

async function checkVolunteerAuth() {
    try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
            window.location.href = "/index.html";
            return false;
        }

        const user = await response.json();

        if (user.role !== "VOLUNTEER") {
            window.location.href = "/main.html";
            return false;
        }

        return true;
    } catch (error) {
        console.error(error);
        window.location.href = "/index.html";
        return false;
    }
}

async function loadActiveRequests() {
    const container = document.getElementById("activeRequests");

    try {
        const response = await fetch("/api/volunteer/active-requests");
        const data = await response.json();

        if (!response.ok) {
            container.innerHTML = `<p>${data.message}</p>`;
            return;
        }

        if (data.length === 0) {
            container.innerHTML = "<p>No active SOS requests right now.</p>";
            return;
        }

        container.innerHTML = data.map(event => `
        <div class="request-card">
                <h4>Emergency Request #${event.id}</h4>
                <p><strong>Status:</strong> ${event.status}</p>
                <p><strong>User ID:</strong> ${event.userId ?? "Unknown"}</p>
                <p><strong>Latitude:</strong> ${event.latitude}</p>
                <p><strong>Longitude:</strong> ${event.longitude}</p>
                <a target="_blank" href="https://www.google.com/maps?q=${event.latitude},${event.longitude}">
                  Open Location
                </a>
                <p><strong>Responder Priority:</strong></p>
                <ul>
                  <li>Doctors nearby</li>
                  <li>Nurses nearby</li>
                  <li>CPR trained volunteers</li>
                  <li>General volunteers</li>
                </ul>
            </div>
        `).join("");
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Failed to load active requests.</p>";
    }
}