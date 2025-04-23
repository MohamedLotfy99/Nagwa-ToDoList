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
import Layout from "./pages/Layout.tsx";
import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";

// Setting up the router with route definitions
const router = createBrowserRouter([
  {
    // Root element where all the routes will be nested
    element: <Layout />, // The Layout component will be the wrapper for all routes
    errorElement: <NotFoundPage />, // Show NotFoundPage if no matching route is found
    children: [
      // The default route, immediately redirects to "/Login"
      { path: "/", element: <Navigate to="/Login" replace /> },

      // Login route, renders LoginPage component
      { path: "/Login", element: <LoginPage /> },

      // Home route, renders HomePage component
      { path: "/Home", element: <HomePage /> },

      // Signup route, renders SignupPage component
      { path: "/Signup", element: <SignupPage /> },

      // TodoList route with dynamic parameter ":id", renders TodoListPage component
      { path: "/TodoList/:id", element: <TodoListPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
