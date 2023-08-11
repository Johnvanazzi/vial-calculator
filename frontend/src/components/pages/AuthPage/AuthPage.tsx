import { ReactElement, useState } from "react";
import BasePanel from "../../ui/BasePanel/BasePanel";
import "./AuthPage.scss";
import LogInForm from "./LogInForm/LogInForm";
import SignUpForm from "./SignUpForm/SignUpForm";

export default function AuthPage(): ReactElement {
    const [step, setStep] = useState("login");

    function renderForm(): ReactElement {
        return step === "login" ? (
            <>
                <h2 className="header">Log In</h2>
                <LogInForm onSignUpClick={() => setStep("signup")}></LogInForm>
            </>
        ) : (
            <>
                <h2 className="header">Sign Up</h2>
                <SignUpForm onLoginClick={() => setStep("login")}></SignUpForm>
            </>
        );
    }

    return <BasePanel className="auth-page">{renderForm()}</BasePanel>;
}
