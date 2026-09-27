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

import { buildPortfolioSnapshot, detectAlerts } from './portfolio.js';

export function createDashboardSummary() {
  const portfolio = buildPortfolioSnapshot();
  const alerts = detectAlerts();

  return {
    portfolio,
    alerts,
    networkScore:
      portfolio.totalBalanceUsd > 150000
        ? 'strong'
        : portfolio.totalBalanceUsd > 75000
          ? 'stable'
          : 'watchlist'
  };
}
