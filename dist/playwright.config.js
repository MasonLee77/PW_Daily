"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '.env') });
exports.default = (0, test_1.defineConfig)({
    testDir: './src/tests',
    testMatch: '**/*.spec.ts',
    globalSetup: './src/utils/global-setup.ts',
    globalTeardown: './src/utils/global-teardown.ts',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? '50%' : undefined,
    timeout: 60_000,
    expect: {
        timeout: parseInt(process.env.EXPECT_TIMEOUT || '10000'),
    },
    reporter: [
        ['html', { open: 'always' }],
        ['allure-playwright'],
        ['list'],
    ],
    use: {
        baseURL: process.env.BASE_URL || '',
        viewport: { width: 1920, height: 1080 },
        actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '10000'),
        navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
        trace: process.env.CI ? 'on-first-retry' : 'off',
        screenshot: process.env.CI ? 'only-on-failure' : 'on',
        video: 'off',
        headless: process.env.HEADED !== 'true',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...test_1.devices['Desktop Chrome'] },
        },
    ],
});
//# sourceMappingURL=playwright.config.js.map