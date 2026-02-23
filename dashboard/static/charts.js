let attackChart, severityChart, ipChart;

async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("totalAlerts").innerText = data.total_alerts;

    updateTable(data.recent_alerts);
    updateCharts(data);
}

function updateTable(alerts) {
    const tbody = document.querySelector("#alertsTable tbody");
    tbody.innerHTML = "";

    alerts.forEach(alert => {
        const row = `
            <tr>
                <td>${alert.TIMESTAMP}</td>
                <td>${alert.ALERT_TYPE}</td>
                <td>${alert.SEVERITY_LEVEL}</td>
                <td>${alert.SOURCE_IP}</td>
                <td>${alert.DESTINATION_IP}</td>
                <td>${alert.PROTOCOL}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function createChart(ctx, label, counts) {
    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: label,
                data: Object.values(counts)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function updateCharts(data) {
    if (attackChart) attackChart.destroy();
    if (severityChart) severityChart.destroy();
    if (ipChart) ipChart.destroy();

    attackChart = createChart(
        document.getElementById("attackChart").getContext("2d"),
        "Attack Types",
        data.attack_counts
    );

    severityChart = createChart(
        document.getElementById("severityChart").getContext("2d"),
        "Severity Levels",
        data.severity_counts
    );
}

setInterval(loadData, 3000);
loadData();