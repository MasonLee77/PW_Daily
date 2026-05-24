"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalSetup;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const env_config_1 = require("./env.config");
function globalSetup() {
    const resultsDir = env_config_1.ENV.ALLURE_RESULTS_DIR;
    const reportHistoryDir = path_1.default.join('allure-report', 'history');
    const resultsHistoryDir = path_1.default.join(resultsDir, 'history');
    if ((0, fs_1.existsSync)(resultsDir)) {
        (0, fs_1.rmSync)(resultsDir, { recursive: true, force: true });
    }
    (0, fs_1.mkdirSync)(resultsDir, { recursive: true });
    if ((0, fs_1.existsSync)(reportHistoryDir)) {
        (0, fs_1.cpSync)(reportHistoryDir, resultsHistoryDir, { recursive: true });
    }
}
//# sourceMappingURL=global-setup.js.map