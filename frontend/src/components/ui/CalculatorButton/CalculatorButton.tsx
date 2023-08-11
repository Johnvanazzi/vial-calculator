import { ButtonHTMLAttributes, ReactElement } from "react";
import { CalculatorButtonProps } from "./CalculatorButton.props";
import "./CalculatorButton.scss";

export default function CalculatorButton(props: CalculatorButtonProps & ButtonHTMLAttributes<any>): ReactElement {
    const { buttonType, ...buttonHtmlProps } = props;
    buttonHtmlProps.className = `calculator-button ${buttonType}`;

    return <button {...buttonHtmlProps}>{buttonHtmlProps.children}</button>;
}
