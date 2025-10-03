import { test, expect } from "vitest";
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

const CIS277 = DATA[0];
const maria = CIS277.students.find((s) => s.name === "Maria");
const john = CIS277.students.find((s) => s.name === "John");

test("calculates Maria's percentage correctly", () => {
  expect(getStudentPercentage(CIS277, maria.id)).toBeGreaterThan(0);
});

test("calculates John’s percentage correctly", () => {
  expect(getStudentPercentage(CIS277, john.id)).toBeGreaterThan(0);
});

test("calculates class average correctly", () => {
  expect(getClassAverage(CIS277)).toBeGreaterThan(0);
});

test("addAssignmentToCourse preserves immutability", () => {
  const newCourse = addAssignmentToCourse({
    course: CIS277,
    assignmentName: "Final Exam",
    maxPoints: 100,
  });
  expect(
    CIS277.students[0].assignments.find((a) => a.name === "Final Exam")
  ).toBeUndefined();
  expect(
    newCourse.students[0].assignments.find((a) => a.name === "Final Exam")
  ).toBeDefined();
});

test("calculateDiscount works properly", () => {
  expect(calculateDiscount(100, 20)).toBe(80);
});

test("formatGrade returns correct letters", () => {
  expect(formatGrade(95)).toBe("A");
  expect(formatGrade(85)).toBe("B");
  expect(formatGrade(72)).toBe("C");
  expect(formatGrade(61)).toBe("D");
  expect(formatGrade(40)).toBe("F");
});

test("isValidScore validates correctly", () => {
  expect(isValidScore(10, 20)).toBe(true);
  expect(isValidScore(-1, 20)).toBe(false);
  expect(isValidScore(25, 20)).toBe(false);
});

test("generateStudentId creates an ID with initials", () => {
  const id = generateStudentId("Jane", "Doe");
  expect(id.startsWith("JD-")).toBe(true);
});

test("calculateLetterGrade uses formatGrade", () => {
  expect(calculateLetterGrade(88)).toBe("B");
});

test("findTopStudent returns the top student", () => {
  const top = findTopStudent(CIS277);
  expect(top).toHaveProperty("name");
});
