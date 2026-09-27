const React = window.React;
const ReactDOM = window.ReactDOM;
const { useState, useEffect } = React;

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

  if (loading) return <div className="container"><p>Loading dashboard...</p></div>;
  if (error) return <div className="container error"><p>Error: {error}</p></div>;
  if (!dashboard) return <div className="container"><p>No data available</p></div>;

  const { portfolio, alerts, networkScore } = dashboard;

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'div',
      { className: 'header' },
      React.createElement('h1', null, 'Aranmobinn'),
      React.createElement(
        'div',
        { className: 'badge' },
        'Multi-Chain DeFi Dashboard'
      )
    ),
    React.createElement(
      'div',
      { className: 'grid' },
      React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'label' }, 'Total Balance'),
        React.createElement(
          'div',
          { className: 'value' },
          '$' + portfolio.totalBalanceUsd.toLocaleString()
        )
      ),
      React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'label' }, 'Holdings'),
        React.createElement('div', { className: 'value' }, portfolio.totalHoldings)
      ),
      React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'label' }, 'Avg Yield'),
        React.createElement(
          'div',
          { className: 'value' },
          portfolio.averageYieldApr.toFixed(1) + '%'
        )
      ),
      React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'label' }, 'Network Score'),
        React.createElement(
          'div',
          { className: 'value' },
          networkScore.toUpperCase()
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'panel' },
      React.createElement(
        'div',
        { className: 'card full' },
        React.createElement('h3', null, 'Chains Overview (Live RPC Data)'),
        React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement('th', null, 'Chain'),
              React.createElement('th', null, 'Balance'),
              React.createElement('th', null, 'Yield'),
              React.createElement('th', null, 'Latency'),
              React.createElement('th', null, 'Status')
            )
          ),
          React.createElement(
            'tbody',
            null,
            portfolio.chains.map((chain) =>
              React.createElement(
                'tr',
                { key: chain.chain },
                React.createElement('td', null, chain.chain),
                React.createElement('td', null, '$' + chain.balanceUsd.toLocaleString()),
                React.createElement('td', null, chain.yieldApr.toFixed(1) + '%'),
                React.createElement('td', null, chain.latencyMs + ' ms'),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'span',
                    { className: 'status ' + (chain.rpcHealthy ? 'healthy' : 'warning') },
                    chain.rpcHealthy ? 'Healthy' : 'Issue'
                  )
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'panel' },
      React.createElement(
        'div',
        { className: 'card full' },
        React.createElement('h3', null, 'Alerts'),
        alerts.length > 0
          ? React.createElement(
              'div',
              { className: 'alerts' },
              alerts.map((alert, idx) =>
                React.createElement(
                  'div',
                  { key: idx, className: 'alert alert-' + alert.level },
                  React.createElement('span', { className: 'alert-level' }, alert.level.toUpperCase()),
                  React.createElement('span', { className: 'alert-message' }, alert.chain + ': ' + alert.message)
                )
              )
            )
          : React.createElement('p', null, 'No active alerts.')
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Dashboard));
