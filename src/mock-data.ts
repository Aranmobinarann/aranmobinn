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

import type { Alert, Chain, ChainStatus, PortfolioSnapshot } from './types.js';

export const chainProfiles: Record<Chain, Omit<ChainStatus, 'chain'>> = {
  TRON: { active: true, rpcHealthy: true, latencyMs: 178, balanceUsd: 28000, holdings: 6, yieldApr: 12.5 },
  SOLANA: { active: true, rpcHealthy: true, latencyMs: 132, balanceUsd: 41500, holdings: 8, yieldApr: 10.3 },
  ETHEREUM: { active: true, rpcHealthy: true, latencyMs: 146, balanceUsd: 56300, holdings: 11, yieldApr: 8.7 },
  BITCOIN: { active: true, rpcHealthy: true, latencyMs: 190, balanceUsd: 33200, holdings: 4, yieldApr: 3.8 },
  TON: { active: true, rpcHealthy: true, latencyMs: 204, balanceUsd: 18900, holdings: 5, yieldApr: 14.2 }
};

export function buildPortfolioSnapshot(): PortfolioSnapshot {
  const chains: ChainStatus[] = (Object.keys(chainProfiles) as Chain[]).map((chain) => ({
    chain,
    ...chainProfiles[chain]
  }));

  const totalBalanceUsd = chains.reduce((total, chain) => total + chain.balanceUsd, 0);
  const totalHoldings = chains.reduce((total, chain) => total + chain.holdings, 0);
  const averageYieldApr = chains.reduce((total, chain) => total + chain.yieldApr, 0) / chains.length;

  return {
    totalBalanceUsd,
    totalHoldings,
    averageYieldApr,
    chains
  };
}

export function buildAlerts(): Alert[] {
  const snapshot = buildPortfolioSnapshot();

  return snapshot.chains
    .filter((chain) => chain.latencyMs > 180 || chain.yieldApr > 12)
    .map((chain) => ({
      chain: chain.chain,
      level: chain.latencyMs > 180 ? 'warning' : 'info',
      message: chain.latencyMs > 180
        ? `Latency spike detected on ${chain.chain}. RPC response is slow.`
        : `${chain.chain} is delivering above-average farming yield.`
    }));
}

export function buildDashboardSummary() {
  const portfolio = buildPortfolioSnapshot();
  const alerts = buildAlerts();

  return {
    portfolio,
    alerts,
    networkScore: portfolio.totalBalanceUsd > 150000 ? 'strong' : portfolio.totalBalanceUsd > 75000 ? 'stable' : 'watchlist'
  };
}
