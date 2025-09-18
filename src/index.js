const gradeBook = {
  courses: [
    {
      id: "CS277",
      name: "Web Development",
      students: [
        {
          id: 1,
          name: "Maria",
          assignments: [
            { name: "Project 1", points: 85, maxPoints: 100 },
            { name: "Quiz 1", points: 18, maxPoints: 20 },
          ],
        },
        {
          id: 2,
          name: "John",
          assignments: [
            { name: "Project 1", points: 92, maxPoints: 100 },
            { name: "Quiz 1", points: 19, maxPoints: 20 },
          ],
        },
      ],
    },
  ],
};

// Calculate percentage for one student
const getStudentPercentage = (courseId, studentId) => {
  const foundCourse = gradeBook.courses.find(({ id }) => id === courseId);
  const foundStudent = foundCourse.students.find(({ id }) => id === studentId);

  const totalPoints = foundStudent.assignments.reduce(
    (acc, a) => acc + a.points,
    0
  );
  const totalMaxPoints = foundStudent.assignments.reduce(
    (acc, a) => acc + a.maxPoints,
    0
  );

  return Math.round((totalPoints / totalMaxPoints) * 100);
};

// Calculate class average across students
const getClassAverage = (courseId) => {
  const foundCourse = gradeBook.courses.find(({ id }) => id === courseId);
  const totalStudents = foundCourse.students.length;

  return Math.round(
    foundCourse.students
      .map(({ id }) => getStudentPercentage(courseId, id))
      .reduce((acc, percentage) => acc + percentage, 0) / totalStudents
  );
};

// Example usage
const classAverage = getClassAverage("CS277");
console.info("Class average:", classAverage);


