import BaseInput from "../../../ui/BaseInput/BaseInput";
import BaseButton from "../../../ui/BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import EmailValidator from "../../../../utils/validators/EmailValidator";
import PasswordValidator from "../../../../utils/validators/PasswordValidator";
import { LogInFormProps } from "./LogInForm.props";
import authApi from "../../../../custom/AuthApi";

export default function LogInForm(props: LogInFormProps): ReactElement {
    const formId = "login-form";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [apiError, setApiError] = useState<string>();

    async function validateLogin() {
        const loginEmailErrors = EmailValidator.validateEmail(email);
        const loginPasswordErrors = PasswordValidator.validatePassword(password);

        setEmailErrors(loginEmailErrors);
        setPasswordErrors(loginPasswordErrors);

        if (loginEmailErrors.length === 0 && loginPasswordErrors.length === 0) {
            await tryToLogin();
        }
    }

    async function tryToLogin() {
        const body = {
            email: email.trim(),
            password: password.trim(),
        };

        await authApi
            .post(`/login`, body)
            .then((response) => {
                sessionStorage.setItem("jwt", response.data["accessToken"]);
                sessionStorage.setItem("user_email", email);
                navigate("/");
            })
            .catch((error) => {
                setApiError(error.response.data.message);
            });
    }

    function handleSignUpClick(): void {
        props.onSignUpClick();
    }

    return (
        <form id="login-form" name="login">
            <div className="form-field">
                <label form={formId} htmlFor="login-email">
                    Email
                </label>
                <BaseInput
                    id="login-email"
                    type="email"
                    errors={emailErrors}
                    onValueChange={(email) => setEmail(email)}
                    value={email}
                />
            </div>

            <div className="form-field">
                <label form={formId} htmlFor="login-password">
                    Password
                </label>
                <BaseInput
                    id="login-password"
                    type="password"
                    errors={passwordErrors}
                    onValueChange={(pwd) => setPassword(pwd)}
                    value={password}
                />
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <div className="panel-footer-buttons">
                <BaseButton buttonType="secondary" onClick={() => handleSignUpClick()}>
                    Sign Up
                </BaseButton>
                <BaseButton buttonType="primary" onClick={() => validateLogin()}>
                    Log In
                </BaseButton>
            </div>
        </form>
    );
}
