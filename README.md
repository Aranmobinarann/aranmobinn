# Aranmobinn

**See Through the Chain** – A production-ready multi-chain DeFi dashboard.

## Overview

Aranmobinn is a comprehensive DeFi portfolio management system designed to monitor and manage assets across multiple blockchain networks:

- **Ethereum**
- **Solana**
- **Tron**
- **Bitcoin**
- **TON**

## Features

- ✅ Multi-chain portfolio aggregation with live RPC data
- ✅ Real-time balance tracking and yield calculation
- ✅ Alert system for latency spikes and high-yield opportunities
- ✅ PostgreSQL database for user management and wallet tracking
- ✅ JWT authentication for secure API access
- ✅ React-based dashboard with responsive design
- ✅ Express.js backend with TypeScript
- ✅ Docker and docker-compose for easy deployment
- ✅ Apache 2.0 license

## Tech Stack

- **Frontend**: React 18, Vanilla CSS
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Blockchain**: ethers.js, RPC endpoints
- **Deployment**: Docker, docker-compose

## Quick Start

### Prerequisites

- Node.js 22+
- PostgreSQL 15+ (or use Docker)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aranmobinarann/aranmobinn.git
   cd aranmobinn
   ```

2. Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start PostgreSQL (if not already running):

   ```bash
   # Using Docker
   docker run --rm -d -p 5432:5432 -e POSTGRES_PASSWORD=changeme -e POSTGRES_DB=aranmobinn postgres:15-alpine
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser to:

   ```
   http://localhost:3000
   ```

## Deployment

### Using Docker Compose

```bash
cp .env.example .env
# Edit .env with your configuration
npm run docker:compose
```

### Manual Deployment

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/health` – Check service health
- `GET /api/portfolio` – Get portfolio summary
- `GET /api/chains` – List all chain balances
- `GET /api/alerts` – Get active alerts
- `GET /api/dashboard` – Complete dashboard data

## Configuration

### Environment Variables

Key configuration:

```bash
# Server
PORT=3000
APP_NAME=Aranmobinn
NODE_ENV=production

# Database
DB_USER=aranmobinn
DB_PASSWORD=changeme
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aranmobinn

# Security
JWT_SECRET=your-secret-key-change-in-production

# Blockchain RPC Endpoints
RPC_ETHEREUM=https://eth.public.zph.ch
RPC_SOLANA=https://api.mainnet-beta.solana.com
RPC_TRON=https://api.trongrid.io/jsonrpc
RPC_BITCOIN=https://blockstream.info/api
RPC_TON=https://toncenter.com/api/v2

# Wallet Addresses
WALLET_ETHEREUM=0x...
WALLET_SOLANA=...
WALLET_TRON=...
WALLET_BITCOIN=...
WALLET_TON=...
```

## Development

### Running in Development Mode

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm start
```

## Important Security Notes

⚠️ **NEVER commit `.env` file or private keys to version control.**

- Private keys and sensitive data must be kept in `.env` (which is in `.gitignore`)
- Change `JWT_SECRET` in production
- Use strong database passwords
- Rotate RPC keys regularly
- Use environment-specific configurations

## License

This project is licensed under the **Apache License, Version 2.0**.

See [LICENSE](LICENSE) for the full text.

Copyright 2026 Aranmobinarann.

## Support

For issues, questions, or contributions, please visit:

https://github.com/Aranmobinarann/aranmobinn

---

**Aranmobinn – See Through the Chain.**
