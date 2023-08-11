import React, { ReactElement } from "react";
import "./App.scss";
import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar/NavBar";

export default function App(): ReactElement {
    return (
        <div id="app">
            <NavBar />
            <div className="page-wrapper">
                <Outlet />
            </div>
        </div>
    );
}
