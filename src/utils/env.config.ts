import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  HEADED: process.env.HEADED === 'true',
  SLOW_MO: parseInt(process.env.SLOW_MO || ''),
  ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT || ''),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || ''),
  EXPECT_TIMEOUT: parseInt(process.env.EXPECT_TIMEOUT || ''),
  TEST_USER_NAME: process.env.TEST_USER_NAME || '',
  TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || '',
  ALLURE_RESULTS_DIR: process.env.ALLURE_RESULTS_DIR || '',
} as const;
