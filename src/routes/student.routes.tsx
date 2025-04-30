import MyOfferedCourse from "../pages/student/MyOfferedCourse";
import MySchedule from "../pages/student/MySchedule";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard></StudentDashboard>,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <MyOfferedCourse></MyOfferedCourse>,
  },
  {
    name: "My Schedule",
    path: "schedule",
    element: <MySchedule></MySchedule>,
  },
];
