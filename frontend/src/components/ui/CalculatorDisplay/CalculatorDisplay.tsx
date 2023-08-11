import { CalculatorDisplayProps } from "./CalculatorDisplay.props";
import "./CalculatorDisplay.scss";

export default function CalculatorDisplay(props: CalculatorDisplayProps) {
    return (
        <div className="calculator-display">
            <div className="display-track">{props.track}</div>
            <div className="display-current">{props.current}</div>
        </div>
    );
}
