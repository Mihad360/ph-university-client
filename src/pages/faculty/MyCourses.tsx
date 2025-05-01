import { FieldValues } from "react-hook-form";
import PHForm from "../../components/form/PHForm";
import { useGetAllfacultyCoursesQuery } from "../../redux/features/faculty/facultyCourse.api";
import PHSelect from "../../components/form/PHSelect";
import { Button, Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { data: facultyCourses } = useGetAllfacultyCoursesQuery(undefined);
  const navigate = useNavigate();
  const semesterOptions = facultyCourses?.data?.map((item) => ({
    label: `${item.academicSemester.name} - ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));
  const courseOptions = facultyCourses?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    navigate(`/faculty/courses/${data?.semesterRegistration}/${data?.course}`);
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={8}>
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              options={semesterOptions}
              label="Semester"
              name="semesterRegistration"
            ></PHSelect>
            <PHSelect
              options={courseOptions}
              label="Course"
              name="course"
            ></PHSelect>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default MyCourses;
