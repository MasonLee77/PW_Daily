"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForPageLoad = waitForPageLoad;
exports.formatDate = formatDate;
async function waitForPageLoad(page) {
    await page.waitForLoadState('networkidle');
}
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return format
        .replace('YYYY', String(year))
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}
//# sourceMappingURL=helpers.js.map