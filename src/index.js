import DATA from "./data.js";
import {
  addAssignmentToCourse,
  getClassAverage,
  getStudentPercentage,
  calculateDiscount,
  formatGrade,
  isValidScore,
  generateStudentId,
  calculateLetterGrade,
  findTopStudent,
} from "./utils.js";

// Assume only one course in DATA
const CIS277 = DATA[0];

// Find Maria and John
const maria = CIS277.students.find((s) => s.name === "Maria");
const john = CIS277.students.find((s) => s.name === "John");

console.info(
  `Maria's percentage: ${getStudentPercentage(CIS277, maria.id)}%`
);

console.info(
  `John's percentage: ${getStudentPercentage(CIS277, john.id)}%`
);

console.info(`Class average: ${getClassAverage(CIS277)}%`);

// Immutability check
console.info(
  "Adding assignment: Shows original vs new data (immutability)"
);
const newCourse = addAssignmentToCourse({
  course: CIS277,
  assignmentName: "Final Exam",
  maxPoints: 100,
});

console.info("Original assignments for Maria:", maria.assignments);

const newMaria = newCourse.students.find((s) => s.name === "Maria");
console.info("New assignments for Maria:", newMaria.assignments);

// Testing extra utility functions
console.info("Discounted Price (100, 20%):", calculateDiscount(100, 20));
console.info("Format Grade (88%):", formatGrade(88));
console.info("Is Valid Score (15/20):", isValidScore(15, 20));
console.info("Generated Student ID:", generateStudentId("Jane", "Doe"));
console.info("Letter Grade (72%):", calculateLetterGrade(72));
console.info("Top Student:", findTopStudent(CIS277)?.name);


