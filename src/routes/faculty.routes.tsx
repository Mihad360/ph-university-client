import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";
import MyStudents from "../pages/faculty/MyStudents";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard></FacultyDashboard>,
  },
  {
    name: "My Courses",
    path: "my-courses",
    element: <MyCourses></MyCourses>,
  },
  {
    path: "courses/:registeredSemesterId/:courseId",
    element: <MyStudents></MyStudents>,
  },
];
