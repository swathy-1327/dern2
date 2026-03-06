document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});

async function loadDashboard() {
    try {
        const response = await fetch("/api/stats/summary");
        const data = await response.json();

        document.getElementById("totalReports").textContent = data.totalReports;
        document.getElementById("totalSos").textContent = data.totalSos;
        document.getElementById("activeSos").textContent = data.activeSos;

        const labels = Object.keys(data.reportsByType);
        const values = Object.values(data.reportsByType);

        const ctx = document.getElementById("reportsChart").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [{
                    label: "Reports Count",
                    data: values
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}