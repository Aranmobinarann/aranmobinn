# Aranmobinn

Aranmobin – See Through the Chain. DeFi Dashboard on Tron, Solana, Ethereum, Bitcoin & TON.

## Overview

Aranmobinn is a multi-chain DeFi dashboard prototype designed to monitor portfolio value, yield opportunities, blockchain health, and alerts across multiple ecosystems.

## Features

- Multi-chain portfolio overview
- Yield and balance aggregation
- Alert detection for latency spikes and strong performance signals
- Express API backend
- Static frontend dashboard
- Docker support
- Apache 2.0 licensing

## Stack

- TypeScript
- Node.js
- Express
- Docker

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start in development mode:

   ```bash
   npm run dev
   ```

3. Open the dashboard:

   ```text
   http://localhost:3000
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the production build:

   ```bash
   npm start
   ```

## Docker

### Build image

```bash
docker build -t aranmobinn .
```

### Run container

```bash
docker run --rm -p 3000:3000 aranmobinn
```

## API endpoints

- `GET /api/health`
- `GET /api/portfolio`
- `GET /api/chains`
- `GET /api/alerts`
- `GET /api/dashboard`

## Environment variables

Use `.env.example` as a template:

```bash
PORT=3000
APP_NAME=Aranmobinn
NODE_ENV=development
```

## Notes

This repository is a functional demo scaffold, not yet a full blockchain integration layer. It is designed as a strong foundation for future real-chain RPC data collection and wallet-driven analysis.

## License

This project is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.
