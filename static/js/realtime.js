let chart;
let currentPage = 1;
const itemsPerPage = 20;
let filteredData = [];

// Inicialización
function initDashboard(data) {
    filteredData = [...data];
    displayTable();
    // CAMBIO: Usar 'BTC' (símbolo) en lugar de 'bitcoin' (slug)
    loadChart('BTC', 'Bitcoin'); 
}

// Lógica de la Tabla con colores Verde/Rojo
function displayTable() {
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredData.slice(start, start + itemsPerPage);
    
    const tbody = document.getElementById('tableBody');
    if(!tbody) return;
    tbody.innerHTML = '';

    paginatedItems.forEach((c, index) => {
        const getClass = (val) => val >= 0 ? 'text-up' : 'text-down';

        // CAMBIO: Pasar c.symbol en lugar de c.slug para que la API de CMC lo reconozca
        tbody.innerHTML += `
            <tr onclick="loadChart('${c.symbol}', '${c.name}')">
                <td>${start + index + 1}</td>
                <td>
                    <div style="display:flex; align-items:center;">
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${c.id}.png" width="20" style="margin-right:12px;">
                        <strong>${c.name}</strong> <span style="color:var(--text-muted); margin-left:6px;">${c.symbol}</span>
                    </div>
                </td>
                <td style="color:var(--primary); font-weight:bold;">$${c.quote.USD.price.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="${getClass(c.quote.USD.percent_change_1h)}">${c.quote.USD.percent_change_1h.toFixed(2)}%</td>
                <td class="${getClass(c.quote.USD.percent_change_24h)}">${c.quote.USD.percent_change_24h.toFixed(2)}%</td>
                <td class="${getClass(c.quote.USD.percent_change_7d)}">${c.quote.USD.percent_change_7d.toFixed(2)}%</td>
                <td>$${Math.round(c.quote.USD.market_cap).toLocaleString()}</td>
                <td>$${Math.round(c.quote.USD.volume_24h).toLocaleString()}</td>
            </tr>
        `;
    });
    updatePaginationControls();
}

// Cargar Datos de la API
async function loadChart(symbol, name) {
    const title = document.getElementById('chartTitle');
    title.innerText = `CARGANDO ${name.toUpperCase()}...`;

    try {
        // Llamamos a la ruta exacta de app.py
        const response = await fetch(`/dashboard-chart/${symbol}`);
        const result = await response.json();
        
        if (!result.prices || result.prices.length === 0) {
            // Si esto aparece, confirma que tu plan de CMC permite datos históricos
            title.innerText = `Binance: SIN ACCESO A DATOS HISTÓRICOS PARA ${name}`;
            return;
        }

        const labels = result.prices.map(p => new Date(p[0]).toLocaleDateString());
        const values = result.prices.map(p => p[1]);

        renderChart(labels, values, name);
        title.innerText = `${name.toUpperCase()} // Binance MARKET TREND`;
    } catch (error) {
        title.innerText = "ERROR DE CONEXIÓN CON Binance";
    }
}


function renderChart(labels, values, name) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Precio ${name} (USD)`, // Esto quita el "undefined"
                data: values,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                pointRadius: 3, // Bolitas en cada punto
                pointBackgroundColor: '#38bdf8',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { 
                    grid: { 
                        display: true, 
                        color: 'rgba(36, 43, 61, 0.4)', // Líneas verticales
                        drawTicks: false 
                    },
                    ticks: { color: '#64748b' }
                },
                y: { position: 'right', grid: { color: '#242b3d' }, ticks: { color: '#64748b' } }
            }
        }
    });
}

// Ordenamiento y Filtros
function sortData(order) {
    if (order === 'high') {
        filteredData.sort((a, b) => b.quote.USD.price - a.quote.USD.price);
    } else {
        filteredData.sort((a, b) => a.quote.USD.price - b.quote.USD.price);
    }
    currentPage = 1;
    displayTable();
}

function updateTable() {
    const query = document.getElementById('cryptoSearch').value.toLowerCase();
    filteredData = allData.filter(c => 
        c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)
    );
    currentPage = 1;
    displayTable();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const info = document.getElementById('pageInfo');
    if(info) info.innerText = `PÁGINA ${currentPage} / ${totalPages}`;
}

function nextPage() { if ((currentPage * itemsPerPage) < filteredData.length) { currentPage++; displayTable(); } }
function prevPage() { if (currentPage > 1) { currentPage--; displayTable(); } }