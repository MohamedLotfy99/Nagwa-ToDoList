import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignupPage from "./pages/SignupPage/SignupPage.tsx";
import Layout from "./Layout.tsx";
import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Navigate to="/Login" replace /> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/Home", element: <HomePage /> },
      { path: "/Signup", element: <SignupPage /> },
      { path: "/TodoList/:id", element: <TodoListPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
