import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./assets/components/pages/HomePage.tsx";
import LoginPage from "./assets/components/pages/LoginPage.tsx";
import NotFoundPage from "./assets/components/pages/NotFoundPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage />, errorElement: <NotFoundPage /> },
  {
    path: "/HomePage",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
