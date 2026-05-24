"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env.example') });
exports.ENV = {
    BASE_URL: process.env.BASE_URL || '',
    HEADED: process.env.HEADED === 'true',
    SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
    ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT || '10000'),
    NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    EXPECT_TIMEOUT: parseInt(process.env.EXPECT_TIMEOUT || '10000'),
    TEST_USER_NAME: process.env.TEST_USER_NAME || '',
    TEST_USER_EMAIL: process.env.TEST_USER_EMAIL || '',
    ALLURE_RESULTS_DIR: process.env.ALLURE_RESULTS_DIR || 'allure-results',
};
//# sourceMappingURL=env.config.js.map