import { Controller, FieldValues } from "react-hook-form";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroups, genders } from "../../../constants/global";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  selectDepartmentOptions,
  selectSemesterOptions,
  selectValueOptions,
} from "../../../utils/selectIdAndValueOptions";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentValidation } from "../../../validations/userManagement.schema";
import dayjs from "dayjs";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const studentDummyData = {
  name: {
    firstName: "Montasir",
    middleName: "Ahmed",
    lastName: "Mihad",
  },
  gender: "male",
  bloodGroup: "O+",
  email: "ahmedmihad@gmail.com",
  contactNumber: "+455535353335",
  presentAddress: "123 Main Street, Springfield, USA",
  permanentAddress: "456 Elm Street, Springfield, USA",
  guardian: {
    fatherName: "James Doe",
    motherName: "Emily Doe",
    fatherOccupation: "Engineer",
    motherOccupation: "Teacher",
    contactNo: "+0987654321",
  },
  academicSemester: "67f272fe49d2dbd58a9a8b89",
  academicDepartment: "67f26f4942224368563e5860",
};

const genderOptions = selectValueOptions(genders);

const bloodGroupOptions = selectValueOptions(bloodGroups);

const CreateStudent = () => {
  const { data: academicSemesterData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  const { data: academicDepartmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });
  const [createStudent] = useCreateStudentMutation();

  const academicSemesterOptions = selectSemesterOptions(
    academicSemesterData?.data
  );
  const academicDepartmentOptions = selectDepartmentOptions(
    academicDepartmentData?.data
  );
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const studentData = {
      password: "student23",
      student: {
        ...data,
        dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data?.profileImg);
    const res = (await createStudent(formData)) as TResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={studentDummyData}
          resolver={zodResolver(createStudentValidation)}
        >
          <Divider>Personal Info</Divider>
          <Row gutter={5}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.firstName"
                type="text"
                label="First Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.middleName"
                type="text"
                label="Middle Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="name.lastName"
                type="text"
                label="Last Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={genderOptions}
                name="gender"
                type="text"
                label="Gender"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                name="dateOfBirth"
                label="Date Of Birth"
              ></PHDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                type="text"
                label="Blood Group"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      size="large"
                      value={value?.fileName}
                      type="file"
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    ></Input>
                  </Form.Item>
                )}
              ></Controller>
            </Col>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name="email" type="text" label="Email"></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="contactNumber"
                type="text"
                label="Contact Number"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="presentAddress"
                type="text"
                label="Present Address"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
              ></PHInput>
            </Col>
            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherName"
                type="text"
                label="Father Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherName"
                type="text"
                label="Mother Name"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father Occupation"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother Occupation"
              ></PHInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="guardian.contactNo"
                type="text"
                label="Contact No."
              ></PHInput>
            </Col>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicSemesterOptions}
                disabled={sIsLoading}
                name="academicSemester"
                type="text"
                label="Academic Semester"
              ></PHSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicDepartmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                type="text"
                label="Academic Department"
              ></PHSelect>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
