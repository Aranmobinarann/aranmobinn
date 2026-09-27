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

import type { Alert, PortfolioSnapshot } from '../types.js';
import { chainService } from './chain-service.js';

export async function buildPortfolioSnapshot(): Promise<PortfolioSnapshot> {
  const chains = await chainService.getAllBalances();
  const totalBalanceUsd = chains.reduce((total, chain) => total + chain.balanceUsd, 0);
  const totalHoldings = chains.reduce((total, chain) => total + chain.holdings, 0);
  const averageYieldApr = chains.reduce((total, chain) => total + chain.yieldApr, 0) / chains.length;

  return {
    totalBalanceUsd: parseFloat(totalBalanceUsd.toFixed(2)),
    totalHoldings,
    averageYieldApr: parseFloat(averageYieldApr.toFixed(2)),
    chains
  };
}

export async function buildAlerts(): Promise<Alert[]> {
  const snapshot = await buildPortfolioSnapshot();

  return snapshot.chains
    .filter((chain) => chain.latencyMs > 2000 || chain.yieldApr > 12)
    .map((chain) => ({
      chain: chain.chain,
      level: chain.latencyMs > 2000 ? 'warning' : 'info',
      message: chain.latencyMs > 2000
        ? `RPC latency on ${chain.chain} is ${chain.latencyMs}ms — consider switching providers.`
        : `${chain.chain} is yielding ${chain.yieldApr}% APR — excellent opportunity!`
    }));
}

export async function buildDashboardSummary() {
  const portfolio = await buildPortfolioSnapshot();
  const alerts = await buildAlerts();

  return {
    portfolio,
    alerts,
    networkScore: portfolio.totalBalanceUsd > 150000 ? 'strong' : portfolio.totalBalanceUsd > 75000 ? 'stable' : 'watchlist',
    timestamp: new Date().toISOString()
  };
}
