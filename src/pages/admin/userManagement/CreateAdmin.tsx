import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { Controller, FieldValues } from "react-hook-form";
import { selectValueOptions } from "../../../utils/selectIdAndValueOptions";
import { bloodGroups, genders } from "../../../constants/global";
import dayjs from "dayjs";
import { useCreateAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const genderOptions = selectValueOptions(genders);
const bloodGroupOptions = selectValueOptions(bloodGroups);

const defaultAdminValues = {
  password: "admin360",
  designation: "Software Engineer",
  name: {
    firstName: "Montasir",
    middleName: "Ahmed",
    lastName: "Mihad",
  },
  gender: "male",
  //   dateOfBirth: "1990-08-25",
  email: "mihad@gmail.com",
  contactNo: "+1-555-123-4567",
  emergencyContactNo: "+1-555-987-6543",
  bloodGroup: "O+",
  presentAddress: "789 Main Street, Los Angeles, CA, USA",
  permanentAddress: "456 Maple Avenue, New York, NY, USA",
};

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Loading!!");
    const adminData = {
      ...data,
      dateOfBirth: dayjs(data?.dateOfBirth).format("YYYY-MM-DD"),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data?.profileImg);
    const res = await createAdmin(formData) as TResponse<any>
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
          defaultValues={defaultAdminValues}
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
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
