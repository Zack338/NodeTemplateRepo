import COURSES from "./data.js";
import {
  getStudentPercentage,
  getClassAverage,
  addAssignment,
} from "./utils.js";

// Demo of the functions
console.log("Maria's percentage:", getStudentPercentage(COURSES, "CS277", 1) + "%");
console.log("John's percentage:",  getStudentPercentage(COURSES, "CS277", 2) + "%");
console.log("Class average:",      getClassAverage(COURSES, "CS277") + "%");

// Show immutability by adding a new assignment
const updatedCourses = addAssignment(COURSES, {
  courseId: "CS277",
  name: "Final Exam",
  maxPoints: 50,
});

console.log("\nOriginal courses:");
console.log(JSON.stringify(COURSES, null, 2));

console.log("\nAfter adding assignment:");
console.log(JSON.stringify(updatedCourses, null, 2));



