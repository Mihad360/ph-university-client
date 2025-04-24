import { useParams } from "react-router-dom";
import {
  useGetEachStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  selectDepartmentOptions,
  selectSemesterOptions,
  selectValueOptions,
} from "../../../utils/selectIdAndValueOptions";
import { bloodGroups, genders } from "../../../constants/global";
import { FieldValues } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import dayjs from "dayjs";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

const genderOptions = selectValueOptions(genders);
const bloodGroupOptions = selectValueOptions(bloodGroups);

const UpdateStudent = () => {
  const params = useParams();
  const { data: studentData, isLoading } = useGetEachStudentQuery(params?.id);
  const { data: academicSemesterData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined, { skip: isLoading });
  const { data: academicDepartmentData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined, { skip: sIsLoading });
  const [updateStudent] = useUpdateStudentMutation();

  const academicSemesterOptions = selectSemesterOptions(
    academicSemesterData?.data
  );
  const academicDepartmentOptions = selectDepartmentOptions(
    academicDepartmentData?.data
  );

  if (isLoading) return <p>Loading...</p>;
  if (!studentData?.data) return <div>No student data found</div>;

  const {
    email,
    gender,
    dateOfBirth,
    contactNumber,
    bloodGroup,
    guardian,
    permanentAddress,
    presentAddress,
    profileImg,
    academicDepartment,
    academicSemester,
    name,
    _id,
  } = studentData.data;
  const defaultUpdateData = {
    name,
    email,
    gender,
    dateOfBirth: dayjs(dateOfBirth),
    contactNumber,
    bloodGroup,
    guardian,
    permanentAddress,
    presentAddress,
    profileImg,
    academicDepartment: academicDepartment?._id,
    academicSemester: academicSemester?._id,
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const updateStudentData = {
      student: {
        ...data,
        dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
      },
    };
    const res = await updateStudent({ id: _id, ...updateStudentData });
    if (res?.data?.success) {
      toast.success(res?.data?.message, { id: toastId, duration: 2000 });
    } else {
      toast.error(res?.data?.message, { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={defaultUpdateData}
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
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
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
            </Col> */}
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

export default UpdateStudent;
