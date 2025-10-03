`// ========== FROM YOUR PICTURES ==========
export const addAssignmentToCourse = ({
  course,
  assignmentName,
  maxPoints,
}) => {
  const clonedCourse = structuredClone(course);

  const newAssignment = { name: assignmentName, points: null, maxPoints };

  clonedCourse.students = clonedCourse.students.map((student) => ({
    ...student,
    assignments: [...student.assignments, newAssignment],
  }));

  return clonedCourse;
};

export const getClassAverage = (course) => {
  return Math.round(
    course.students
      .map(({ id }) => getStudentPercentage(course, id))
      .reduce((acc, percentage) => acc + percentage, 0) /
      course.students.length
  );
};

export const getStudentPercentage = (course, studentId) => {
  const { totalPoints, totalMaxPoints } = course.students
    .find(({ id }) => id === studentId)
    ?.assignments.reduce(
      (totalPointsAccumulator, { points, maxPoints }) => ({
        totalPoints: totalPointsAccumulator.totalPoints + points,
        totalMaxPoints:
          totalPointsAccumulator.totalMaxPoints + maxPoints,
      }),
      { totalPoints: 0, totalMaxPoints: 0 }
    ) || { totalPoints: 0, totalMaxPoints: 0 };

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

// ========== BUGGY FUNCTIONS TO FIX ==========
export const calculateDiscount = (price, discountPercent) => {
  // FIXED: apply discount properly
  return price - price * (discountPercent / 100);
};

export const formatGrade = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

export const isValidScore = (points, maxPoints) => {
  return (
    typeof points === "number" &&
    typeof maxPoints === "number" &&
    points >= 0 &&
    points <= maxPoints
  );
};

// ========== MISSING FUNCTIONS TO IMPLEMENT ==========
export const generateStudentId = (firstName, lastName) => {
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}-${Date.now()}`;
};

export const calculateLetterGrade = (percentage) => {
  return formatGrade(percentage);
};

export const findTopStudent = (course) => {
  return course.students.reduce(
    (top, student) => {
      const pct = getStudentPercentage(course, student.id);
      return pct > top.percentage ? { student, percentage: pct } : top;
    },
    { student: null, percentage: -1 }
  ).student;
};
