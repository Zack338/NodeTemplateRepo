// Grade calculation constants
const GRADE_A_THRESHOLD = 90;
const GRADE_B_THRESHOLD = 80;
const GRADE_C_THRESHOLD = 70;
const GRADE_D_THRESHOLD = 60;

/**
 * Calculates the letter grade for a numeric grade.
 * @param {number} numericGrade - The numeric grade (0–100).
 * @returns {string} The corresponding letter grade.
 */
const calculateLetterGrade = (numericGrade) => {
  if (numericGrade >= GRADE_A_THRESHOLD) return "A";
  if (numericGrade >= GRADE_B_THRESHOLD) return "B";
  if (numericGrade >= GRADE_C_THRESHOLD) return "C";
  if (numericGrade >= GRADE_D_THRESHOLD) return "D";
  return "F";
};

// Test cases
const testGrades = [95, 87, 74, 58, 92, 68];

// Run tests and display results
testGrades.forEach((grade) => {
  console.info(`Grade ${grade}: ${calculateLetterGrade(grade)}`);
});
