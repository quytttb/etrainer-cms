import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/layout";
import UserManagement from "../pages/UserManagement/UserManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListVocabulary from "../pages/LessonManagement/VocabularyManagement/ListVocabulary";
import AddVocabulary from "../pages/LessonManagement/VocabularyManagement/AddVocabulary";
import EditVocabulary from "../pages/LessonManagement/VocabularyManagement/EditVocabulary";

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

      // vocabulary
      {
        path: "/vocabulary",
        element: <ListVocabulary />,
      },
      {
        path: "/vocabulary/add",
        element: <AddVocabulary />,
      },
      {
        path: "/vocabulary/edit/:id",
        element: <EditVocabulary />,
      },
    ],
  },
]);

export default router;
