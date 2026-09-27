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

import type { ChainStatus, Chain } from './types.js';

export const chainMetrics: Record<Chain, Omit<ChainStatus, 'chain'>> = {
  TRON: { active: true, rpcHealthy: true, latencyMs: 178, balanceUsd: 28000, holdings: 6, yieldApr: 12.5 },
  SOLANA: { active: true, rpcHealthy: true, latencyMs: 132, balanceUsd: 41500, holdings: 8, yieldApr: 10.3 },
  ETHEREUM: { active: true, rpcHealthy: true, latencyMs: 146, balanceUsd: 56300, holdings: 11, yieldApr: 8.7 },
  BITCOIN: { active: true, rpcHealthy: true, latencyMs: 190, balanceUsd: 33200, holdings: 4, yieldApr: 3.8 },
  TON: { active: true, rpcHealthy: true, latencyMs: 204, balanceUsd: 18900, holdings: 5, yieldApr: 14.2 }
};

export const supportedChains: Chain[] = ['TRON', 'SOLANA', 'ETHEREUM', 'BITCOIN', 'TON'];

export function getChainStatus(): ChainStatus[] {
  return supportedChains.map((chain) => ({
    chain,
    ...chainMetrics[chain]
  }));
}
