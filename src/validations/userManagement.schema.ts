import { z } from "zod";

const userNameValidation = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name cannot exceed 20 characters" }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .max(20, { message: "First name cannot exceed 20 characters" }),
});

const guardianValidation = z.object({
  fatherName: z.string().nonempty({ message: "Father's name is required" }),
  motherName: z.string().nonempty({ message: "Mother's name is required" }),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father's occupation is required" }),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother's occupation is required" }),
  contactNo: z.string().nonempty({ message: "Contact number is required" }),
});

export const createStudentValidation = z.object({
  name: userNameValidation,
  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),
//   dateOfBirth: z.string().datetime().optional(),
  email: z.string().email(),
  contactNumber: z.string().min(11),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  academicSemester: z.string(),
  academicDepartment: z.string(),
  guardian: guardianValidation,
});
