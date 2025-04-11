import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/layout";
import UserManagement from "../pages/UserManagement/UserManagement";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <UserManagement />,
      },
    ],
  },
]);

export default router;
