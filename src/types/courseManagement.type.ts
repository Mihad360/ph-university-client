export type TSemesterRegistration = {
  _id: string;
  academicSemester: {
    name: string;
  };
  status: "UPCOMING" | "ONGOING" | "ENDED"; // Add other possible status values if needed
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  minCredit: number;
  maxCredit: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: []; // or Course[] if you want to nest the full course objects
  __v: number;
};
