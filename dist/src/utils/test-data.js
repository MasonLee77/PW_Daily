"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataGenerator = void 0;
class TestDataGenerator {
    static getTimestamp() {
        return new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    }
    static getRandomSuffix(length = 4) {
        return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
    }
    static generateEmail(testName) {
        return `auto_${testName}_${this.getTimestamp()}_${this.getRandomSuffix()}@test.com`;
    }
    static generateUsername(testName) {
        return `auto_${testName}_${this.getTimestamp()}_${this.getRandomSuffix()}`;
    }
    static generatePhone(prefix = '09') {
        const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
        return `${prefix}${digits}`;
    }
    static generateString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }
    static generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static generateUniqueId(prefix = 'ID') {
        return `${prefix}_${this.getTimestamp()}_${this.getRandomSuffix(6)}`;
    }
    static generatePassword(length = 12) {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const digits = '0123456789';
        const special = '!@#$%^&*';
        const all = upper + lower + digits + special;
        let password = [
            upper[Math.floor(Math.random() * upper.length)],
            lower[Math.floor(Math.random() * lower.length)],
            digits[Math.floor(Math.random() * digits.length)],
            special[Math.floor(Math.random() * special.length)],
        ];
        for (let i = password.length; i < length; i++) {
            password.push(all[Math.floor(Math.random() * all.length)]);
        }
        return password.sort(() => Math.random() - 0.5).join('');
    }
}
exports.TestDataGenerator = TestDataGenerator;
//# sourceMappingURL=test-data.js.map