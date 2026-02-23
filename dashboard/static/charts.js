async function loadData() {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("totalAlerts").innerText = data.total_alerts;

    // Build table
    const tbody = document.querySelector("#alertsTable tbody");
    tbody.innerHTML = "";

    data.recent_alerts.forEach(alert => {
        const row = `
            <tr>
                <td>${alert.timestamp}</td>
                <td>${alert.attack_type}</td>
                <td>${alert.severity}</td>
                <td>${alert.ip_pair}</td>
                <td>${alert.protocol}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    buildChart(data.attack_counts);
}

function buildChart(counts) {
    const ctx = document.getElementById("attackChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(counts),
            datasets: [{
                label: "Attack Counts",
                data: Object.values(counts)
            }]
        }
    });
}

setInterval(loadData, 3000);
loadData();