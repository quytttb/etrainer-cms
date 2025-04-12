import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/layout";
import UserManagement from "../pages/UserManagement/UserManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListVocabulary from "../pages/LessonManagement/VocabularyManagement/ListVocabulary";
import AddVocabulary from "../pages/LessonManagement/VocabularyManagement/AddVocabulary";
import EditVocabulary from "../pages/LessonManagement/VocabularyManagement/EditVocabulary";
import ListGrammar from "../pages/LessonManagement/GrammarManagement/ListGrammar";
import AddGrammar from "../pages/LessonManagement/GrammarManagement/AddGrammar";
import EditGrammar from "../pages/LessonManagement/GrammarManagement/EditGrammar";

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

      // grammar
      {
        path: "/grammar",
        element: <ListGrammar />,
      },
      {
        path: "/grammar/add",
        element: <AddGrammar />,
      },
      {
        path: "/grammar/edit/:id",
        element: <EditGrammar />,
      },
    ],
  },
]);

export default router;
