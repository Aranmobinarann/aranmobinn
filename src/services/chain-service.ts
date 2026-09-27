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

import { JsonRpcProvider } from 'ethers';
import type { Chain, ChainStatus } from './types.js';
import { rpcEndpoints, walletAddresses } from './config.js';

class ChainService {
  async getEthereumBalance(chain: 'ETHEREUM'): Promise<ChainStatus> {
    const startTime = Date.now();
    try {
      const provider = new JsonRpcProvider(rpcEndpoints[chain]);
      const address = walletAddresses[chain];
      const balance = await provider.getBalance(address);
      const latencyMs = Date.now() - startTime;

      return {
        chain,
        active: true,
        rpcHealthy: latencyMs < 3000,
        latencyMs,
        balanceUsd: parseFloat((Number(balance) / 1e18 * 2500).toFixed(2)),
        holdings: 1,
        yieldApr: 8.7
      };
    } catch (error) {
      console.error(`Error fetching ${chain} balance:`, error);
      return {
        chain,
        active: false,
        rpcHealthy: false,
        latencyMs: Date.now() - startTime,
        balanceUsd: 0,
        holdings: 0,
        yieldApr: 0
      };
    }
  }

  async getSolanaBalance(chain: 'SOLANA'): Promise<ChainStatus> {
    const startTime = Date.now();
    try {
      const response = await fetch(rpcEndpoints[chain], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [walletAddresses[chain]]
        })
      });
      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      const balanceLamports = data.result?.value ?? 0;
      const balanceSol = balanceLamports / 1e9;
      const balanceUsd = parseFloat((balanceSol * 200).toFixed(2));

      return {
        chain,
        active: true,
        rpcHealthy: latencyMs < 3000 && !data.error,
        latencyMs,
        balanceUsd,
        holdings: 1,
        yieldApr: 10.3
      };
    } catch (error) {
      console.error(`Error fetching ${chain} balance:`, error);
      return {
        chain,
        active: false,
        rpcHealthy: false,
        latencyMs: Date.now() - startTime,
        balanceUsd: 0,
        holdings: 0,
        yieldApr: 0
      };
    }
  }

  async getTronBalance(chain: 'TRON'): Promise<ChainStatus> {
    const startTime = Date.now();
    try {
      const response = await fetch('https://api.trongrid.io/v1/accounts/' + walletAddresses[chain]);
      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      const balanceSun = data.balance ?? 0;
      const balanceTrx = balanceSun / 1e6;
      const balanceUsd = parseFloat((balanceTrx * 0.12).toFixed(2));

      return {
        chain,
        active: true,
        rpcHealthy: latencyMs < 3000 && data.address,
        latencyMs,
        balanceUsd,
        holdings: 1,
        yieldApr: 12.5
      };
    } catch (error) {
      console.error(`Error fetching ${chain} balance:`, error);
      return {
        chain,
        active: false,
        rpcHealthy: false,
        latencyMs: Date.now() - startTime,
        balanceUsd: 0,
        holdings: 0,
        yieldApr: 0
      };
    }
  }

  async getBitcoinBalance(chain: 'BITCOIN'): Promise<ChainStatus> {
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://blockstream.info/api/address/${walletAddresses[chain]}`
      );
      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      const balanceSatoshis = data.chain_stats?.funded_txo_sum ?? 0;
      const balanceBtc = balanceSatoshis / 1e8;
      const balanceUsd = parseFloat((balanceBtc * 45000).toFixed(2));

      return {
        chain,
        active: true,
        rpcHealthy: latencyMs < 3000 && data.address,
        latencyMs,
        balanceUsd,
        holdings: 1,
        yieldApr: 3.8
      };
    } catch (error) {
      console.error(`Error fetching ${chain} balance:`, error);
      return {
        chain,
        active: false,
        rpcHealthy: false,
        latencyMs: Date.now() - startTime,
        balanceUsd: 0,
        holdings: 0,
        yieldApr: 0
      };
    }
  }

  async getTonBalance(chain: 'TON'): Promise<ChainStatus> {
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://toncenter.com/api/v2/getAddressInformation?address=${walletAddresses[chain]}`
      );
      const data = await response.json();
      const latencyMs = Date.now() - startTime;

      const balanceNano = data.result?.balance ?? 0;
      const balanceTon = parseFloat(balanceNano) / 1e9;
      const balanceUsd = parseFloat((balanceTon * 5).toFixed(2));

      return {
        chain,
        active: true,
        rpcHealthy: latencyMs < 3000 && data.ok,
        latencyMs,
        balanceUsd,
        holdings: 1,
        yieldApr: 14.2
      };
    } catch (error) {
      console.error(`Error fetching ${chain} balance:`, error);
      return {
        chain,
        active: false,
        rpcHealthy: false,
        latencyMs: Date.now() - startTime,
        balanceUsd: 0,
        holdings: 0,
        yieldApr: 0
      };
    }
  }

  async getAllBalances(): Promise<ChainStatus[]> {
    return Promise.all([
      this.getEthereumBalance('ETHEREUM'),
      this.getSolanaBalance('SOLANA'),
      this.getTronBalance('TRON'),
      this.getBitcoinBalance('BITCOIN'),
      this.getTonBalance('TON')
    ]);
  }
}

export const chainService = new ChainService();
