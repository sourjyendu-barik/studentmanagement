import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import StudentView from "./pages/students/StudentView.jsx";
import ClassView from "./pages/classes/ClassView.jsx";
import SchoolView from "./pages/school/SchoolView.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import StudentForm from "./pages/students/StudentForm.jsx";
import StudentDetail from "./pages/students/StudentDetail .jsx";
import StudentEdit from "./pages/students/StudentEdit.jsx";
import TeacherrsView from "./pages/Teachers/TeacherrsView.jsx";
import TeacherDetails from "./pages/Teachers/TeacherDetails.jsx";
import AddTeacher from "./pages/Teachers/AddTeacher.jsx";
import UpdateTeacher from "./pages/Teachers/UpdateTeacher.jsx";
import ClassStudentList from "./pages/classes/ClassStudentList.jsx";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <StudentView />,
      },
      {
        path: "studentView",
        element: <StudentView />,
      },
      {
        path: "classView",
        element: <ClassView />,
      },
      {
        path: "schoolView",
        element: <SchoolView />,
      },
      {
        path: "/addStudent",
        element: <StudentForm />,
      },
      {
        path: "studentDetail/:id",
        element: <StudentDetail />,
      },
      {
        path: "studentEdit/:id",
        element: <StudentEdit />,
      },
      {
        path: "teacherView",
        element: <TeacherrsView />,
      },
      { path: "teacherDetail/:id", element: <TeacherDetails /> },
      { path: "addTeacher", element: <AddTeacher /> },
      { path: "updateTeacher", element: <UpdateTeacher /> },
      { path: "/classStudents/:className", element: <ClassStudentList /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </Provider>
  </StrictMode>,
);
