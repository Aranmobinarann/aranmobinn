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
import cors from 'cors';
import 'dotenv/config';
import { config } from './config.js';
import { initializeDatabase } from './database.js';
import { buildDashboardSummary } from './services/dashboard-service.js';
import { verifyToken } from './auth.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

app.use(express.json());
app.use(cors());
app.use(express.static(publicDir));

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid token' });
  (req as any).userId = decoded.userId;
  next();
};

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: config.appName,
    environment: config.environment,
    version: '1.0.0'
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

async function start() {
  await initializeDatabase();
  app.listen(config.port, () => {
    console.log(`${config.appName} is running on http://localhost:${config.port}`);
    console.log(`Fetching live data from blockchain RPC endpoints...`);
  });
}

start();
