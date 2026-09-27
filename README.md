# Aranmobinn

Aranmobin – See Through the Chain. DeFi Dashboard on Tron, Solana, Ethereum, Bitcoin & TON.

## Overview

This repository now includes a lightweight TypeScript dashboard prototype for a multi-chain decentralized finance portfolio. It exposes a local API and a small front-end interface that renders the portfolio summary, blockchain health, and alerts.

## Features

- Dashboard summary API
- Multi-chain portfolio view
- Alert generation for slow RPC or strong yield signals
- Static web frontend
- Apache 2.0 license support

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the local dashboard in development mode:

   ```bash
   npm run dev
   ```

3. Open a browser to:

   ```text
   http://localhost:3000
   ```

4. Or build the project:

   ```bash
   npm run build
   ```

5. Start the production build:

   ```bash
   npm start
   ```

## API endpoints

- `GET /api/health`
- `GET /api/portfolio`
- `GET /api/chains`
- `GET /api/alerts`
- `GET /api/dashboard`

## Notes

This is a demo scaffold for the project concept. Real blockchain RPC integration, wallet support, and protocol pricing logic can be added on top of this foundation.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
