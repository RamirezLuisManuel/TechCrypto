let historyChart;

function initHistory(data, symbol) {
    if (!data || data.length === 0) {
        document.getElementById('chartTitle').innerText = `ERROR: SIN DATOS PARA ${symbol}`;
        return;
    }
    renderHistoryChart(data, symbol);
    setupSearch();
}

function renderHistoryChart(data, symbol) {
    const ctx = document.getElementById('historyChart').getContext('2d');
    
    // Binance devuelve timestamp en milisegundos
    const labels = data.map(d => new Date(d[0]).toLocaleDateString());
    const values = data.map(d => d[1]);

    if (historyChart) historyChart.destroy();

    historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                // FIX para el "undefined": Definimos la etiqueta explícitamente
                label: `Precio ${symbol}/USDT`, 
                data: values,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                fill: true,
                pointRadius: 1,
                pointHoverRadius: 6,
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                // FIX: Ocultamos la leyenda para evitar el cuadro con "undefined"
                legend: { display: false }, 
                tooltip: {
                    backgroundColor: '#161b2c',
                    titleColor: '#38bdf8',
                    displayColors: false
                }
            },
            scales: {
                x: { 
                    grid: { color: 'rgba(36, 43, 61, 0.3)', drawTicks: false },
                    ticks: { color: '#64748b', maxTicksLimit: 10 }
                },
                y: { 
                    position: 'right',
                    grid: { color: '#242b3d' },
                    ticks: { color: '#64748b', callback: (v) => '$' + v.toLocaleString() }
                }
            }
        }
    });
    document.getElementById('chartTitle').innerText = `${symbol.toUpperCase()} // TREND HISTÓRICO`;
}

function setupSearch() {
    const input = document.getElementById('coinSearch');
    const btn = document.getElementById('searchBtn');
    if(!input || !btn) return;

    const doSearch = () => {
        const val = input.value.toUpperCase().trim();
        if (val) window.location.href = `/history?coin=${val}`;
    };

    btn.onclick = doSearch;
    input.onkeypress = (e) => { if(e.key === 'Enter') doSearch(); };
}