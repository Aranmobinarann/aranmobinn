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

export type Chain = 'TRON' | 'SOLANA' | 'ETHEREUM' | 'BITCOIN' | 'TON';

export interface ChainStatus {
  chain: Chain;
  active: boolean;
  rpcHealthy: boolean;
  latencyMs: number;
  balanceUsd: number;
  holdings: number;
  yieldApr: number;
}

export interface PortfolioSnapshot {
  totalBalanceUsd: number;
  totalHoldings: number;
  averageYieldApr: number;
  chains: ChainStatus[];
}

export interface Alert {
  chain: Chain;
  level: 'info' | 'warning' | 'critical';
  message: string;
}
