
// Utility functions for working with courses

// Calculate a single student's overall percentage
export function getStudentPercentage(courses, courseId, studentId) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;

  const student = course.students.find(s => s.id === studentId);
  if (!student) return 0;

  const totals = student.assignments.reduce(
    (acc, a) => {
      acc.points += a.points;
      acc.max += a.maxPoints;
      return acc;
    },
    { points: 0, max: 0 }
  );

  if (totals.max === 0) return 0;
  return Math.round((totals.points / totals.max) * 100);
}

// Get the average percentage for the whole class
export function getClassAverage(courses, courseId) {
  const course = courses.find(c => c.id === courseId);
  if (!course || course.students.length === 0) return 0;

  const total = course.students.reduce(
    (sum, s) => sum + getStudentPercentage(courses, courseId, s.id),
    0
  );

  return Math.round(total / course.students.length);
}

// Add a new assignment to every student in a course
export function addAssignment(courses, { courseId, name, maxPoints }) {
  const clone = structuredClone(courses);
  const course = clone.find(c => c.id === courseId);
  if (!course) return clone;

  const newAssignment = { name, points: null, maxPoints };

  course.students = course.students.map(s => ({
    ...s,
    assignments: [...s.assignments, newAssignment],
  }));

  return clone;
}
