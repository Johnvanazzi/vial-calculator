import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CalculatorPage from "./components/pages/CalculatorPage/CalculatorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            { element: <CalculatorPage />, index: true },
            { path: "login", element: <AuthPage />, index: true },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
