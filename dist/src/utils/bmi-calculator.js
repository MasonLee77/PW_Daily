"use strict";
/**
 * BMI (Body Mass Index) Calculator
 * Calculates BMI based on height (meters) and weight (kg)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBMI = calculateBMI;
function calculateBMI(height, weight) {
    const bmi = weight / (height * height);
    let bodyType = '';
    if (bmi < 18.5) {
        bodyType = 'Gầy';
    }
    else if (bmi < 24.9) {
        bodyType = 'Bình thường';
    }
    else if (bmi < 29) {
        bodyType = 'Thừa cân';
    }
    else {
        bodyType = 'Béo phì';
    }
    return { bmi, bodyType };
}
// Example usage:
const result = calculateBMI(1.69, 69);
console.log(`BMI: ${result.bmi.toFixed(1)} - ${result.bodyType}`);
//# sourceMappingURL=bmi-calculator.js.map