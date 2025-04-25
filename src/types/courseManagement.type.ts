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
