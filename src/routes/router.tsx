import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/layout";
import AccountManagement from "../pages/AccountManagement/AccountManagement";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListVocabulary from "../pages/LessonManagement/VocabularyManagement/ListVocabulary";
import AddVocabulary from "../pages/LessonManagement/VocabularyManagement/AddVocabulary";
import EditVocabulary from "../pages/LessonManagement/VocabularyManagement/EditVocabulary";
import ListGrammar from "../pages/LessonManagement/GrammarManagement/ListGrammar";
import AddGrammar from "../pages/LessonManagement/GrammarManagement/AddGrammar";
import EditGrammar from "../pages/LessonManagement/GrammarManagement/EditGrammar";
import ListLesson from "../pages/LessonManagement/LessonManagement/ListLesson";
import AddLesson from "../pages/LessonManagement/LessonManagement/AddLesson";
import EditLesson from "../pages/LessonManagement/LessonManagement/EditLesson";
import ListQuestion from "../pages/QuestionManagement/ListQuestion";
import AddQuestion from "../pages/QuestionManagement/AddQuestion";
import EditQuestion from "../pages/QuestionManagement/EditQuestion";
import ListExam from "../pages/ExamManagament/ListExam";
import AddExam from "../pages/ExamManagament/AddExam";
import EditExam from "../pages/ExamManagament/EditExam";
import ListStage from "../pages/StageManagement/ListStage";
import AddStage from "../pages/StageManagement/AddStage";
import EditStage from "../pages/StageManagement/EditStage";
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
import Login from "../pages/Login/Login";
import UserManagement from "../pages/UserManagement/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/account",
        element: <AccountManagement />,
      },
      {
        path: "/user",
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

      // lesson
      {
        path: "/lesson",
        element: <ListLesson />,
      },
      {
        path: "/lesson/add",
        element: <AddLesson />,
      },
      {
        path: "/lesson/edit/:id",
        element: <EditLesson />,
      },

      // question
      {
        path: "/questions",
        element: <ListQuestion />,
      },
      {
        path: "/questions/add",
        element: <AddQuestion />,
      },
      {
        path: "/questions/edit/:id",
        element: <EditQuestion />,
      },

      // exam
      {
        path: "/exam",
        element: <ListExam />,
      },
      {
        path: "/exam/add",
        element: <AddExam />,
      },
      {
        path: "/exam/edit/:id",
        element: <EditExam />,
      },

      // stage
      {
        path: "/stages",
        element: <ListStage />,
      },
      {
        path: "/stages/add",
        element: <AddStage />,
      },
      {
        path: "/stages/edit/:id",
        element: <EditStage />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const isAuthenticated = localStorage.getItem(
        import.meta.env.VITE_ACCESS_TOKEN_KEY
      );
      if (isAuthenticated) {
        window.location.href = "/";
      }

      return null;
    },
  },
]);

export default router;
