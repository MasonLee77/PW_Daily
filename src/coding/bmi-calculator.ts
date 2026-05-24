/**
 * BMI (Body Mass Index) Calculator
 * Calculates BMI based on height (meters) and weight (kg)
 */

export interface BMIResult {
  bmi: number;
  bodyType: string;
}

export function calculateBMI(height: number, weight: number): BMIResult {
  const bmi = weight / (height * height);
  let bodyType = '';

  if (bmi < 18.5) {
    bodyType = 'Gầy';
  } else if (bmi < 24.9) {
    bodyType = 'Bình thường';
  } else if (bmi < 29) {
    bodyType = 'Thừa cân';
  } else {
    bodyType = 'Béo phì';
  }

  return { bmi, bodyType };
}

const result = calculateBMI(1.69, 69);
console.log(result.bmi);        // 24.16
console.log(result.bodyType);   // "Bình thường"