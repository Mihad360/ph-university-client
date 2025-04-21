import { FieldValues } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";

const studentDummyData = {
  password: "botmiyad360",
  student: {
    name: {
      firstName: "Montasir",
      middleName: "Ahmed",
      lastName: "Mihad",
    },
    gender: "male",
    dateOfBirth: "2005-11-07",
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
  },
};

const CreateStudent = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={5}>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="name.firstName" type="text" label="First Name"></PHInput>
            </Col>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="name.middleName" type="text" label="Middle Name"></PHInput>
            </Col>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="name.lastName" type="text" label="Last Name"></PHInput>
            </Col>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="gender" type="text" label="Gender"></PHInput>
            </Col>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="dateOfBirth" type="text" label="Date Of Birth"></PHInput>
            </Col>
            <Col span={24} md={{span: 12}} lg={{ span: 8 }}>
              <PHInput name="bloodGroup" type="text" label="Blood Group"></PHInput>
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
