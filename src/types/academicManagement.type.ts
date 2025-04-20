export interface TAcademicSemester {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
}

export interface TAcademicFaculty {
  _id: string; // or mongoose.Types.ObjectId if you prefer
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number; // version key, optional as it's auto-managed by Mongoose
}

export interface TAcademicDepartment {
  _id: string; // or mongoose.Types.ObjectId if you prefer
  name: string;
  academicFaculty: string; // or mongoose.Types.ObjectId - reference to faculty
  createdAt: string;
  updatedAt: string;
  __v: number; // version key, optional as it's auto-managed by Mongoose
}
