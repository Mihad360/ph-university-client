import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourse.api";

const MySchedule = () => {
  const { data: enrolledCourseData } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(enrolledCourseData);

  return <div>
    {
        enrolledCourseData?.data.map(item => (
            <div key={item._id}>
                <h1>{item.course.title}</h1>
                <p>{item.offeredCourse.section}</p>
                <div>
                    {
                        item.offeredCourse.days.map(day => (
                            <p key={day}>{day}</p>
                        ))
                    }
                </div>
            </div>
        ))
    }
  </div>;
};

export default MySchedule;
