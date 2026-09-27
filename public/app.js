async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function renderSummary(summary) {
  document.getElementById('total-balance').textContent = formatMoney(summary.portfolio.totalBalanceUsd);
  document.getElementById('holdings').textContent = String(summary.portfolio.totalHoldings);
  document.getElementById('avg-yield').textContent = `${summary.portfolio.averageYieldApr.toFixed(1)}%`;
  document.getElementById('network-score').textContent = summary.networkScore.toUpperCase();
}

function renderChains(chains) {
  const tbody = document.getElementById('chain-table-body');
  tbody.innerHTML = chains.map((chain) => {
    const statusClass = chain.rpcHealthy ? 'healthy' : 'warning';
    return `
      <tr>
        <td>${chain.chain}</td>
        <td>${formatMoney(chain.balanceUsd)}</td>
        <td>${chain.yieldApr.toFixed(1)}%</td>
        <td>${chain.latencyMs} ms</td>
        <td><span class="status ${statusClass}">${chain.rpcHealthy ? 'Healthy' : 'Issue'}</span></td>
      </tr>
    `;
  }).join('');
}

function renderAlerts(alerts) {
  const alertsContainer = document.getElementById('alerts');
  if (!alerts.length) {
    alertsContainer.innerHTML = '<p>No active alerts.</p>';
    return;
  }

  alertsContainer.innerHTML = alerts.map((alert) => {
    const levelClass = alert.level === 'warning' ? 'warning' : alert.level === 'critical' ? 'critical' : 'healthy';
    return `
      <div class="card" style="margin-top: 12px; padding: 14px; border-radius: 10px;">
        <span class="status ${levelClass}">${alert.level.toUpperCase()}</span>
        <p style="margin: 12px 0 0;">${alert.chain}: ${alert.message}</p>
      </div>
    `;
  }).join('');
}

async function main() {
  try {
    const dashboard = await fetchJson('/api/dashboard');
    renderSummary(dashboard);
    renderChains(dashboard.portfolio.chains);
    renderAlerts(dashboard.alerts);
  } catch (error) {
    console.error(error);
    document.getElementById('total-balance').textContent = 'Error';
  }
}

main();
