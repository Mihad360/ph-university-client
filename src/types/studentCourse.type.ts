type Course = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: any[]; // You can specify a more detailed type if available
  __v: number;
};

export type TOfferedCourse = {
  _id: string;
  academicSemester: string;
  semesterRegistration: string;
  academicFaculty: string;
  academicDepartment: string;
  course: Course;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[]; // e.g., "Sunday", "Monday"
  startTime: string; // e.g., "08:00"
  endTime: string; // e.g., "10:00"
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: any[];
  completedCourses: any[];
  completedCourseIds: string[];
  isPreRequisitesFullfiled: boolean;
  isAlreadyEnrolled: boolean;
};
