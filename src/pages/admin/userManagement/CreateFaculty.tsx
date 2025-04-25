import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues } from "react-hook-form";
import {
  selectDepartmentOptions,
  selectFacultyOptions,
  selectValueOptions,
} from "../../../utils/selectIdAndValueOptions";
import { bloodGroups, genders } from "../../../constants/global";
import { toast } from "sonner";
import dayjs from "dayjs";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useCreateFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../types";

const genderOptions = selectValueOptions(genders);
const bloodGroupOptions = selectValueOptions(bloodGroups);

const defaultFacultyValues = {
  designation: "Problem solving expert",
  name: {
    firstName: "Riadul",
    middleName: "Islam",
    lastName: "Zihad",
  },
  gender: "male",
  email: "jihad22@gmail.com",
  contactNo: "+1234567890",
  emergencyContactNo: "+1987654321",
  presentAddress: "123 Main St, City, Country",
  permanentAddress: "456 Another St, City, Country",
  bloodGroup: "O+",
  academicDepartment: "67f26faa6771bd2bbfdf479f",
  academicFaculty: "67f26e984bb91fbd2c3c58ec",
};

const CreateFaculty = () => {
  const { data: academicFacultyData, isLoading: fIsLoading } =
    useGetAllAcademicFacultyQuery(undefined);
  const { data: academicDepartmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: fIsLoading });
  const [createFaculty] = useCreateFacultyMutation();

  const academicFacultyOptions = selectFacultyOptions(
    academicFacultyData?.data
  );
  const academicDepartmentOptions = selectDepartmentOptions(
    academicDepartmentData?.data
  );

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const facultyData = {
      faculty: {
        ...data,
        dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data?.profileImg);
    const res = await createFaculty(formData) as TResponse<any>
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
          defaultValues={defaultFacultyValues}
          //   resolver={zodResolver(createStudentValidation)}
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
              <PHInput
                type="text"
                name="designation"
                label="Designation"
              ></PHInput>
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
                name="contactNo"
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
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact Number"
              ></PHInput>
            </Col>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={academicFacultyOptions}
                disabled={fIsLoading}
                name="academicFaculty"
                type="text"
                label="Academic Faculty"
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

export default CreateFaculty;
