import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';
import { ENV } from './env.config';

export default function globalSetup() {
  const resultsDir = ENV.ALLURE_RESULTS_DIR;
  const reportHistoryDir = path.join('allure-report', 'history');
  const resultsHistoryDir = path.join(resultsDir, 'history');

  if (existsSync(resultsDir)) {
    rmSync(resultsDir, { recursive: true, force: true });
  }
  mkdirSync(resultsDir, { recursive: true });

  if (existsSync(reportHistoryDir)) {
    cpSync(reportHistoryDir, resultsHistoryDir, { recursive: true });
  }
}