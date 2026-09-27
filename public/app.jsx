/*
 * Copyright 2026 Aranmobinarann
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setDashboard(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="container"><p>Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="container error"><p>Error: {error}</p></div>;
  }

  if (!dashboard) {
    return <div className="container"><p>No data available</p></div>;
  }

  const { portfolio, alerts, networkScore } = dashboard;

  return (
    <div className="container">
      <div className="header">
        <h1>Aranmobinn</h1>
        <div className="badge">Multi-Chain DeFi Dashboard</div>
      </div>

      <div className="grid">
        <div className="card">
          <div className="label">Total Balance</div>
          <div className="value">${portfolio.totalBalanceUsd.toLocaleString()}</div>
        </div>
        <div className="card">
          <div className="label">Holdings</div>
          <div className="value">{portfolio.totalHoldings}</div>
        </div>
        <div className="card">
          <div className="label">Avg Yield</div>
          <div className="value">{portfolio.averageYieldApr.toFixed(1)}%</div>
        </div>
        <div className="card">
          <div className="label">Network Score</div>
          <div className="value">{networkScore.toUpperCase()}</div>
        </div>
      </div>

      <div className="panel">
        <div className="card full">
          <h3>Chains Overview (Live RPC Data)</h3>
          <table>
            <thead>
              <tr>
                <th>Chain</th>
                <th>Balance</th>
                <th>Yield</th>
                <th>Latency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.chains.map((chain) => (
                <tr key={chain.chain}>
                  <td>{chain.chain}</td>
                  <td>${chain.balanceUsd.toLocaleString()}</td>
                  <td>{chain.yieldApr.toFixed(1)}%</td>
                  <td>{chain.latencyMs} ms</td>
                  <td>
                    <span className={`status ${chain.rpcHealthy ? 'healthy' : 'warning'}`}>
                      {chain.rpcHealthy ? 'Healthy' : 'Issue'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="card full">
          <h3>Alerts</h3>
          {alerts.length > 0 ? (
            <div className="alerts">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`alert alert-${alert.level}`}>
                  <span className="alert-level">{alert.level.toUpperCase()}</span>
                  <span className="alert-message">{alert.chain}: {alert.message}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No active alerts.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);
