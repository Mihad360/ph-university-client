import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <App></App>,
    children: routeGenerator(adminPaths), 
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App></App>,
    children: routeGenerator(studentPaths),
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default router;
