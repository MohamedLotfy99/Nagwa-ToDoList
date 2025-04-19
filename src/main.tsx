import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./assets/components/pages/HomePage.tsx";
import LoginPage from "./assets/components/pages/LoginPage.tsx";
import NotFoundPage from "./assets/components/pages/NotFoundPage.tsx";
import SignupPage from "./assets/components/pages/SignupPage.tsx";
import Layout from "./Layout.tsx";
import TodoListPage from "./assets/components/pages/TodoListPage.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/HomePage", element: <HomePage /> },
      { path: "/SignupPage", element: <SignupPage /> },
      { path: "/todo/:id", element: <TodoListPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
