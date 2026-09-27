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

import type { Alert, PortfolioSnapshot } from './types.js';
import { getChainStatus } from './blockchains.js';

export function buildPortfolioSnapshot(): PortfolioSnapshot {
  const chains = getChainStatus();
  const totalBalanceUsd = chains.reduce((sum, chain) => sum + chain.balanceUsd, 0);
  const totalHoldings = chains.reduce((sum, chain) => sum + chain.holdings, 0);
  const averageYieldApr = chains.reduce((sum, chain) => sum + chain.yieldApr, 0) / chains.length;

  return {
    totalBalanceUsd,
    totalHoldings,
    averageYieldApr,
    chains
  };
}

export function detectAlerts(): Alert[] {
  const chains = getChainStatus();

  return chains
    .filter((chain) => chain.latencyMs > 180 || chain.yieldApr > 12)
    .map((chain) => ({
      chain: chain.chain,
      level: chain.latencyMs > 180 ? 'warning' : 'info',
      message: chain.latencyMs > 180
        ? `Latency spike detected on ${chain.chain}. RPC response is slow.`
        : `${chain.chain} is delivering above-average farming yield.`
    }));
}
