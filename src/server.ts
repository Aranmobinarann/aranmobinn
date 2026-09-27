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

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { config } from './config.js';
import { buildDashboardSummary } from './services/dashboard-service.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

app.use(express.json());
app.use(express.static(publicDir));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: config.appName,
    environment: config.environment,
    version: '0.2.0'
  });
});

app.get('/api/chains', async (_req, res) => {
  const summary = await buildDashboardSummary();
  res.json(summary.portfolio.chains);
});

app.get('/api/alerts', async (_req, res) => {
  const summary = await buildDashboardSummary();
  res.json(summary.alerts);
});

app.get('/api/portfolio', async (_req, res) => {
  const summary = await buildDashboardSummary();
  res.json(summary.portfolio);
});

app.get('/api/dashboard', async (_req, res) => {
  const summary = await buildDashboardSummary();
  res.json(summary);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(config.port, () => {
  console.log(`${config.appName} dashboard is running on http://localhost:${config.port}`);
  console.log(`${config.appName} is fetching live data from blockchain RPC endpoints...`);
});
