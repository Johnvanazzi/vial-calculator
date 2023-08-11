import { useNavigate } from "react-router-dom";
import { ReactElement, useState } from "react";
import EmailValidator from "../../../../utils/validators/EmailValidator";
import PasswordValidator from "../../../../utils/validators/PasswordValidator";
import BaseInput from "../../../ui/BaseInput/BaseInput";
import BaseButton from "../../../ui/BaseButton/BaseButton";
import { SignUpFormProps } from "./SignUpForm.props";
import authApi from "../../../../custom/AuthApi";

export default function SignUpForm(props: SignUpFormProps): ReactElement {
    const formId = "signup-form";
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>([]);
    const [apiError, setApiError] = useState<string>();

    async function validateSignUp() {
        const signupEmailErrors = EmailValidator.validateEmail(email);
        const signupPasswordErrors = PasswordValidator.validatePassword(password);
        const signupConfirmPasswordErrors = PasswordValidator.validateConfirmPassword(password, confirmPassword);

        setEmailErrors(signupEmailErrors);
        setPasswordErrors(signupPasswordErrors);
        setConfirmPasswordErrors(signupConfirmPasswordErrors);

        if (signupEmailErrors.length === 0 && signupPasswordErrors.length === 0) {
            await tryToSignUp();
        }
    }

    async function tryToSignUp() {
        const body = {
            email: email.trim(),
            password: password.trim(),
        };

        await authApi
            .post(`/signup`, body)
            .then((response) => {
                sessionStorage.setItem("jwt", response.data["accessToken"]);
                sessionStorage.setItem("user_email", email);
                navigate("/");
            })
            .catch((error) => {
                setApiError(error.response.data.message);
            });
    }

    return (
        <form id="signup-form" name="signup">
            <div className="form-field">
                <label form={formId} htmlFor="signup-email">
                    Email
                </label>
                <BaseInput
                    id="signup-email"
                    type="email"
                    errors={emailErrors}
                    onValueChange={(email) => setEmail(email)}
                    value={email}
                />
            </div>

            <div className="form-field">
                <label form={formId} htmlFor="signup-password">
                    Password
                </label>
                <BaseInput
                    id="signup-password"
                    type="password"
                    errors={passwordErrors}
                    onValueChange={(pwd) => setPassword(pwd)}
                    value={password}
                />
            </div>

            <div className="form-field">
                <label form={formId} htmlFor="signup-confirm-password">
                    Confirm password
                </label>
                <BaseInput
                    id="signup-confirm-password"
                    errors={confirmPasswordErrors}
                    onValueChange={(pwd) => setConfirmPassword(pwd)}
                    placeholder="confirm the password"
                    type="password"
                    value={confirmPassword}
                />
            </div>

            {apiError && <div className="api-error">{apiError}</div>}

            <div className="panel-footer-buttons">
                <BaseButton buttonType="secondary" onClick={() => props.onLoginClick()}>
                    Log In
                </BaseButton>
                <BaseButton buttonType="primary" onClick={() => validateSignUp()}>
                    Confirm Sign Up
                </BaseButton>
            </div>
        </form>
    );
}
