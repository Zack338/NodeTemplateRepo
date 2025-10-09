export const addAssignmentToCourse = ({ course, assignmentName, maxPoints }) => {
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
  const { totalPoints, totalMaxPoints } =
    course.students
      .find(({ id }) => id === studentId)
      ?.assignments.reduce(
        (acc, { points, maxPoints }) => ({
          totalPoints: acc.totalPoints + points,
          totalMaxPoints: acc.totalMaxPoints + maxPoints,
        }),
        { totalPoints: 0, totalMaxPoints: 0 }
      ) || { totalPoints: 0, totalMaxPoints: 0 };

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

// ================= BUGGY FUNCTIONS (FIXED) =================
export const calculateDiscount = (price, discountPercent) => {
  // FIXED: correctly apply percentage discount
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
  // FIXED: should allow points equal to maxPoints and ensure both are valid numbers
  return (
    typeof points === "number" &&
    typeof maxPoints === "number" &&
    points >= 0 &&
    points <= maxPoints
  );
};

// ================= MISSING FUNCTIONS (IMPLEMENTED) =================
export const generateStudentId = (firstName, lastName) => {
  // Expected pattern: jsmith123 (lowercase initials + 3 random digits)
  const base = `${firstName[0].toLowerCase()}${lastName.toLowerCase()}`;
  const randomDigits = Math.floor(Math.random() * 900 + 100); // 3 digits
  return `${base}${randomDigits}`;
};

export const calculateLetterGrade = (percentage) => {
  // Same logic as formatGrade
  return formatGrade(percentage);
};

export const findTopStudent = (course) => {
  // Return the student object with highest percentage
  let topStudent = null;
  let topPercentage = -1;

  for (const student of course.students) {
    const percentage = getStudentPercentage(course, student.id);
    if (percentage > topPercentage) {
      topStudent = student;
      topPercentage = percentage;
    }
  }

  return topStudent;
};
