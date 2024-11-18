import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import { InicioPage } from "./pages/InicioPage";
import { SinopsisPage } from "./pages/sinopsisPage";
import { Acto2Page } from "./pages/acto2Page";
import { Acto1Page } from "./pages/acto1Page";
import { LoadingProvider } from './context/LoadingContext';
import { Acto3Page } from "./pages/acto3Page";
import { Acto4Page } from "./pages/acto4Page";
import { FinalPage } from "./pages/finalPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "inicio",
        element: <InicioPage />,
      },
      {
        path: "sinopsis",
        element: <SinopsisPage />,
      },
      {
        path: "acto1",
        element: <Acto1Page />,
      },
      {
        path: "acto2",
        element: <Acto2Page />,
      },
      {
        path: "acto3",
        element: <Acto3Page />,
      },
      {
        path: "acto4",
        element: <Acto4Page />,
      },
      {
        path: "final",
        element: <FinalPage />,
      },
      {
        path: "*",
        element: <Navigate to="/inicio" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  </React.StrictMode>
);
