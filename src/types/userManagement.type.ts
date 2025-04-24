type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  contactNo: string;
};

type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TStudent = {
  _id: string;
  id: string;
  user: {
    status: string;
  };
  name: TName;
  gender: "male" | "female" | "other";
  dateOfBirth: string; // ISO date string
  email: string;
  contactNumber: string;
  bloodGroup: string;
  profileImg: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  academicSemester: string;
  academicDepartment: string;
  academicFaculty: string;
  isDeleted: boolean;
  fullName: string;
  __v: number;
};
