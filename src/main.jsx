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
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
