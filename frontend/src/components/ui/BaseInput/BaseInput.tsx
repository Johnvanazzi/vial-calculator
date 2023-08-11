import { InputHTMLAttributes, ReactElement } from "react";
import { BaseInputProps } from "./BaseInput.props";
import "./BaseInput.scss";

export default function BaseInput(props: BaseInputProps & InputHTMLAttributes<any>): ReactElement {
    const { errors, onValueChange, ...htmlProps } = props;
    htmlProps.onChange = (evt) => onValueChange(evt.target.value);
    htmlProps.className = "base-input" + (errors.length > 0 ? " invalid" : "");
    htmlProps.maxLength = htmlProps.maxLength ?? 80;

    function renderInput(): ReactElement {
        switch (htmlProps.type) {
            case "email":
                htmlProps.placeholder = htmlProps.placeholder ?? "email@domain.com";
                break;
            case "password":
                htmlProps.placeholder = htmlProps.placeholder ?? "your password";
                htmlProps.maxLength = 64;
                break;
            default:
                throw new TypeError("Input type not supported yet");
        }

        return (
            <div className="base-input">
                <input {...htmlProps} />
                {errors.length > 0 && (
                    <div className="input-errors">
                        {errors.map((e, i) => (
                            <div key={i} className="input-error-item">
                                {`- ${e}`}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return renderInput();
}
