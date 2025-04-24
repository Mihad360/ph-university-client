import { useParams } from "react-router-dom";
import { useGetEachStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Avatar, Card, Flex } from "antd";

const StudentDetails = () => {
  const params = useParams();
  const { data: studentData, isLoading } = useGetEachStudentQuery(params?.id);

  if (isLoading) return <p>Loading...</p>;
  if (!studentData?.data) return <div>No student data found</div>;

  const {
    fullName,
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
  } = studentData.data;

  return (
    <Flex gap="large" align="start">
      <Card
        title="Basic Information"
        style={{ minWidth: 300, width: "100%", maxWidth: 700 }}
      >
        <Card.Meta
          avatar={
            <Avatar
              size={80}
              src={
                profileImg ||
                `https://api.dicebear.com/7.x/miniavs/svg?seed=${fullName}`
              }
            />
          }
          title={fullName}
          description={
            <div className="mt-2 space-y-1">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Gender:</strong> {gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {dateOfBirth.split("T")[0]}
              </p>
              <p>
                <strong>Contact:</strong> {contactNumber}
              </p>
              <p>
                <strong>Blood Group:</strong> {bloodGroup}
              </p>
            </div>
          }
        />
      </Card>
      <Card
        title="Academic Information"
        style={{ minWidth: 300, width: "100%", maxWidth: 600 }}
      >
        <div className="space-y-1">
          <p>
            <strong>Department:</strong> {academicDepartment?.name}
          </p>
          <p>
            <strong>Semester:</strong> {academicSemester?.name}
          </p>
        </div>
      </Card>
      <Card
        title="Address & Guardian"
        style={{ minWidth: 300, width: "100%", maxWidth: 600 }}
      >
        <div className="space-y-1">
          <p>
            <strong>Present Address:</strong> {presentAddress}
          </p>
          <p>
            <strong>Permanent Address:</strong> {permanentAddress}
          </p>
          <p>
            <strong>Guardian:</strong> {guardian?.fatherName} (Father),{" "}
          </p>
          <p>
            <strong>Guardian:</strong> {guardian?.motherName} (Mother)
          </p>
          <p>
            <strong>Guardian Contact:</strong> {guardian?.contactNo}
          </p>
        </div>
      </Card>
    </Flex>
  );
};

export default StudentDetails;
