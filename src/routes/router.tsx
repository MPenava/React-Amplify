import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@layout";
import { CenterLayout } from "@layout";

import AccessCode from "../features/auth/pages/AccessCode";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import CognitoAuthenticator from "../features/auth/pages/CognitoAuthenticator";
import Login from "../features/auth/pages/Login";
import CognitoAuth from "../features/auth/pages/CognitoAuth";
import Register from "../features/auth/pages/Register";
import ResetPassword from "../features/auth/pages/ResetPassword";

//ts-ignore
const routes = [
  {
    path: "/",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <CognitoAuth />,
      },
    ],
  },
  {
    path: "/login",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/access-code",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <AccessCode />,
      },
    ],
  },
  {
    path: "/reset-password",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/registration",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "/authenticator",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <CognitoAuthenticator />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASENAME || "",
});

const Router = () => (
  <Suspense>
    <RouterProvider router={router} />
  </Suspense>
);

export { Router };
