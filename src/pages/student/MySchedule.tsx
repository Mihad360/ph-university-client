import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MySchedule = () => {
  const { data: enrolledCourseData } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(enrolledCourseData);

  return <div></div>;
};

export default MySchedule;
