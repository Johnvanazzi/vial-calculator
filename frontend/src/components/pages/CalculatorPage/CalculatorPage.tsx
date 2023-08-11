import BasePanel from "../../ui/BasePanel/BasePanel";
import CalculatorButton from "../../ui/CalculatorButton/CalculatorButton";
import { ReactElement, useState } from "react";
import "./CalculatorPage.scss";
import CalculatorDisplay from "../../ui/CalculatorDisplay/CalculatorDisplay";
import { CalculatorDisplayProps } from "../../ui/CalculatorDisplay/CalculatorDisplay.props";

export default function CalculatorPage(): ReactElement {
    const [history, setHistory] = useState<CalculatorDisplayProps[]>([]);
    const [displayHistory, setDisplayHistory] = useState<boolean>(true);
    const [memoryValue, setMemoryValue] = useState<number | undefined>(undefined);
    const [lastInteraction, setLastInteraction] = useState<"equality" | "number" | "operator" | "function">("operator");
    const [currentOperator, setCurrentOperator] = useState("+");
    const [display, setDisplay] = useState<string>("0");
    const [previousValue, setPreviousValue] = useState<number>(0);
    const [calculationTrack, setCalculationTrack] = useState<string>("");
    const [pendingOperation, setPendingOperation] = useState({ value: 0, operator: "" });

    function handleNumber(s: string): void {
        setLastInteraction("number");

        if (lastInteraction === "equality") {
            setCalculationTrack("");
            setDisplay(s);
            return;
        }

        if (lastInteraction === "operator" || lastInteraction === "function") {
            setDisplay(s);
            return;
        }

        const newVal = display + s;
        setDisplay(newVal);
    }

    function clearLast(): void {
        if (display.length === 1) {
            setLastInteraction("operator");
            setDisplay("0");

            return;
        }

        setDisplay((val) => val.substring(0, val.length - 1));
    }

    function clearAll(): void {
        setPreviousValue(0);
        setDisplay("0");
        setCalculationTrack("");
    }

    function getResult(): void {
        setLastInteraction("equality");
        const newTrack = calculationTrack + display + " =";
        const newVal = resolveOperation(previousValue, Number.parseFloat(display));

        setCalculationTrack(newTrack);
        setDisplay(newVal.toString());
        setPreviousValue(newVal);
        setHistory((array) => [{ current: newVal.toString(), track: newTrack }, ...array]);
    }

    function resolveOperation(x: number, y: number): number {
        switch (currentOperator) {
            case "+":
                return x + y;
            case "-":
                return x - y;
            case "*":
                return x * y;
            case "/":
                return x / y;
            case "%":
                return x % y;
            case "sqrt":
                return Math.sqrt(x);
            case "^":
                return x ** y;
            default:
                throw new Error("Operation not supported");
        }
    }

    function handleSquareRoot() {
        setCurrentOperator("sqrt");
        setCalculationTrack((track) => track + `sqrt(${display})`);
        setDisplay((val) => resolveOperation(Number.parseFloat(val), 0).toString());
        setLastInteraction("function");
    }

    function handleOperator(operator: string) {
        setLastInteraction("operator");
        setCurrentOperator(operator);

        if (lastInteraction === "equality") {
            setCalculationTrack(display + ` ${operator} `);

            return;
        }

        if (lastInteraction === "operator") {
            setCalculationTrack((val) => val.substring(0, val.lastIndexOf(currentOperator)).trim() + ` ${operator} `);

            return;
        }

        if (lastInteraction === "function") {
            setCalculationTrack((val) => val + ` ${operator} `);

            return;
        }

        setCalculationTrack((val) => val + display + ` ${operator} `);

        if (operator !== "-" && operator !== "+") {
            setPendingOperation({ value: previousValue, operator: operator });

            return;
        }

        const newVal = resolveOperation(previousValue, Number.parseFloat(display));
        setDisplay(newVal.toString());
        setPreviousValue(newVal);

        return;
    }

    function handleMemoryClear(): void {
        setMemoryValue(undefined);
    }

    function handleMemoryOperation(operation: (x: number, y: number) => number) {
        //setMemoryValue((val) => (val ? operation(currentValue, val) : currentValue));
    }

    function handleDecimalDot() {
        if (display.includes(".")) {
            return;
        }

        setDisplay((display) => display + ".");
    }

    return (
        <div className="calculator-wrapper">
            <BasePanel className="calculator-body">
                <CalculatorDisplay current={display} track={calculationTrack} />
                <div className="calculator-pads">
                    <div className="memory-pad">
                        <CalculatorButton buttonType="memory" onClick={handleMemoryClear}>
                            MC
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory">MR</CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={() => handleMemoryOperation((x, y) => x + y)}>
                            M+
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={() => handleMemoryOperation((x, y) => x - y)}>
                            M-
                        </CalculatorButton>
                    </div>
                    <div className="clear-pad">
                        <CalculatorButton buttonType="number" onClick={clearAll}>
                            C
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={clearLast}>
                            CE
                        </CalculatorButton>
                    </div>
                    <div className="operator-pad">
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("+")}>
                            +
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("-")}>
                            &minus;
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("/")}>
                            &divide;
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("*")}>
                            &times;
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("%")}>
                            %
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleSquareRoot()}>
                            &radic;
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("^")}>
                            ^
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => getResult()}>
                            =
                        </CalculatorButton>
                    </div>
                    <div className="number-pad">
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("7")}>
                            7
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("8")}>
                            8
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("9")}>
                            9
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("4")}>
                            4
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("5")}>
                            5
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("6")}>
                            6
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("1")}>
                            1
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("2")}>
                            2
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("3")}>
                            3
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleNumber("0")}>
                            0
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={() => handleDecimalDot()}>
                            .
                        </CalculatorButton>
                    </div>
                </div>
            </BasePanel>
            <BasePanel className="calculator-side-panel">
                <div className="side-panel-options">
                    <div
                        className={`panel-option ${displayHistory ? " selected" : ""}`.trim()}
                        onClick={() => setDisplayHistory(true)}>
                        History
                    </div>
                    <div
                        className={`panel-option ${displayHistory ? "" : " selected"}`.trim()}
                        onClick={() => setDisplayHistory(false)}>
                        Memory
                    </div>
                </div>
                <div className="side-panel-body">
                    {displayHistory ? (
                        history.map((h, idx) => (
                            <CalculatorDisplay key={idx} current={h.current} track={h.track}></CalculatorDisplay>
                        ))
                    ) : (
                        <div>{memoryValue}</div>
                    )}
                </div>
            </BasePanel>
        </div>
    );
}
