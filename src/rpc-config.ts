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

import type { Chain } from './types.js';

export const rpcEndpoints: Record<Chain, string> = {
  ETHEREUM: process.env.RPC_ETHEREUM ?? 'https://eth.public.zph.ch',
  SOLANA: process.env.RPC_SOLANA ?? 'https://api.mainnet-beta.solana.com',
  TRON: process.env.RPC_TRON ?? 'https://api.trongrid.io/jsonrpc',
  BITCOIN: process.env.RPC_BITCOIN ?? 'https://blockstream.info/api',
  TON: process.env.RPC_TON ?? 'https://toncenter.com/api/v2'
};

export const walletAddresses: Record<Chain, string> = {
  ETHEREUM: process.env.WALLET_ETHEREUM ?? '0x742d35Cc6634C0532925a3b844Bc9e7595f42d1',
  SOLANA: process.env.WALLET_SOLANA ?? 'SolmzZ8VqPQrpqrMh7MKPEQzRSN4jKGnbxGfJEZBBFR',
  TRON: process.env.WALLET_TRON ?? 'TQCfAudKTHJNv5FkRYs6d6xjxpUUTjVSuG',
  BITCOIN: process.env.WALLET_BITCOIN ?? '1A1z7agoat6Ft53BJjwzYXa8xVBDeba4Ce',
  TON: process.env.WALLET_TON ?? 'UQAIVhXUUhA3M8M_YNdqBrJkLPPTWYPy_yiSDAOKG6tKxBPm'
};
