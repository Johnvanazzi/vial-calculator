import { ButtonHTMLAttributes, ReactElement } from "react";
import { BaseButtonProps } from "./BaseButton.props";
import "./BaseButton.scss";

export default function BaseButton(props: BaseButtonProps & ButtonHTMLAttributes<any>): ReactElement {
    const { buttonType, ...buttonHtmlProps } = props;
    buttonHtmlProps.className = getClassName();
    buttonHtmlProps.type = "button";

    function getClassName(): string {
        return buttonHtmlProps.className
            ? `${buttonHtmlProps.className} base-button ${buttonType}`
            : `base-button ${buttonType}`;
    }

    return <button {...buttonHtmlProps}>{props.children}</button>;
}
