import BaseButton from "../BaseButton/BaseButton";
import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import authApi from "../../../custom/AuthApi";

export default function NavBar(): ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    function clearSession() {
        console.log("hello");
        sessionStorage.removeItem("user_email");
        sessionStorage.removeItem("jwt");
        setIsUserLoggedIn(false);
    }

    useEffect(() => {
        const jwt_token = sessionStorage.getItem("jwt");

        if (jwt_token === null) {
            setIsUserLoggedIn(false);

            return;
        }

        setIsUserLoggedIn(true);
    });

    function renderUserSessionButtons(): ReactElement {
        if (isUserLoggedIn) {
            const userEmail = sessionStorage.getItem("user_email");

            return (
                <>
                    <div className="user-welcome">welcome, {userEmail}</div>
                    <BaseButton buttonType="primary" onClick={() => clearSession()}>
                        Log Out
                    </BaseButton>
                </>
            );
        }

        return (
            <BaseButton buttonType="primary" onClick={() => navigate("/login")}>
                Log In
            </BaseButton>
        );
    }

    return (
        <nav className="nav-bar">
            {location.pathname.includes("/login") ? (
                <div className="link-to-calculator" onClick={() => navigate("/")}>
                    Click here to start calculating
                </div>
            ) : (
                <>
                    <h1 className="nav-bar-text">Let's Calculate</h1>
                    {renderUserSessionButtons()}
                </>
            )}
        </nav>
    );
}
