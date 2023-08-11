import BasePanel from "../../ui/BasePanel/BasePanel";
import CalculatorButton from "../../ui/CalculatorButton/CalculatorButton";
import { ReactElement, useState } from "react";
import "./CalculatorPage.scss";
import CalculatorDisplay from "../../ui/CalculatorDisplay/CalculatorDisplay";
import { CalculatorDisplayProps } from "../../ui/CalculatorDisplay/CalculatorDisplay.props";

export default function CalculatorPage(): ReactElement {
    const [history, setHistory] = useState<CalculatorDisplayProps[]>([]);
    const [displayHistory, setDisplayHistory] = useState<boolean>(true);
    const [display, setDisplay] = useState<string>("");
    const [displayTrack, setDisplayTrack] = useState<string>("");
    const [memoryValue, setMemoryValue] = useState<string | undefined>(undefined);
    const [value, setValue] = useState("");
    const [previousValue, setPreviousValue] = useState("");
    const [operation, setOperation] = useState<string | undefined>(undefined);

    function clear() {
        setValue("");
        setPreviousValue("");
        setOperation(undefined);
        setDisplayTrack("");
        setDisplay("");
    }

    function clearEntry() {
        const newVal = value.slice(0, -1);
        setValue(newVal);
        setDisplay(newVal.toString());
    }

    function handleOperator(operator: string) {
        if (value === "" || value === "NaN") {
            return;
        }

        if (previousValue !== "") {
            const result = calculate();

            if (result !== undefined) {
                setValue("");
                setPreviousValue(result);
                setOperation(operator);
                updateDisplay("", operator, result);

                return;
            }
        }

        setOperation(operator);
        setPreviousValue(value);
        setValue("");
        updateDisplay("", operator, value);
    }

    function handleMemoryClear(): void {
        setMemoryValue(undefined);
    }

    function handleMemoryOperation(operation: (x: number, y: number) => number) {
        if (value === "" || memoryValue === undefined) {
            return;
        }

        const newMemoryValue = operation(parseFloat(memoryValue), parseFloat(value)).toString();

        setMemoryValue(newMemoryValue);
    }

    function handleNumber(number: string) {
        if (value === "NaN") {
            return;
        }

        if (number === "." && value.includes(".")) {
            return;
        }

        const newOperand = value + number;
        setValue(newOperand);
        updateDisplay(newOperand, operation, previousValue);
    }

    function updateDisplay(value: string, operator: string | undefined, previousValue: string) {
        setDisplay(value);

        if (operator !== undefined) {
            setDisplayTrack(operator === "sqrt" ? `${operator}(${previousValue})` : `${previousValue} ${operator}`);
        }
    }

    function calculate(currentValue?: string): string | undefined {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue ?? value);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        let result;
        switch (operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                result = prev / current;
                break;
            case "%":
                result = prev % current;
                break;
            case "^":
                result = prev ** current;
                break;
            default:
                return;
        }

        return result.toString();
    }

    function getResult() {
        const result = calculate();

        if (result === undefined) {
            return;
        }

        setValue(result);
        setOperation(undefined);
        setPreviousValue("");
        updateDisplay(result, "", "");
        setHistory((h) => [{ track: displayTrack + ` ${value} =`, current: result }, ...h]);
    }

    function handleMemoryStore() {
        if (value !== "") {
            setMemoryValue(value);
        }
    }

    function handleSquareRoot() {
        if (value === "") {
            return;
        }

        const newValue = Math.sqrt(parseFloat(value)).toString();

        if (operation !== undefined) {
            const result = calculate(newValue);

            if (result !== undefined) {
                setValue(result);
                setOperation(undefined);
                updateDisplay(result, "", "");

                return;
            }
        }

        setValue(newValue);
        setOperation(undefined);
        updateDisplay(newValue, "sqrt", value);
    }

    function memoryRecall() {
        if (memoryValue === undefined) {
            return;
        }

        setValue(memoryValue);
        setDisplay(memoryValue);
    }

    return (
        <div className="calculator-wrapper">
            <BasePanel className="calculator-body">
                <CalculatorDisplay current={display} track={displayTrack} />
                <div className="calculator-pads">
                    <div className="memory-pad">
                        <CalculatorButton buttonType="memory" onClick={handleMemoryClear}>
                            MC
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={memoryRecall}>
                            MR
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={() => handleMemoryOperation((x, y) => x + y)}>
                            M+
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={() => handleMemoryOperation((x, y) => x - y)}>
                            M-
                        </CalculatorButton>
                        <CalculatorButton buttonType="memory" onClick={handleMemoryStore}>
                            MS
                        </CalculatorButton>
                    </div>
                    <div className="clear-pad">
                        <CalculatorButton buttonType="number" onClick={clear}>
                            C
                        </CalculatorButton>
                        <CalculatorButton buttonType="number" onClick={clearEntry}>
                            CE
                        </CalculatorButton>
                    </div>
                    <div className="operator-pad">
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("+")}>
                            +
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("-")}>
                            -
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("/")}>
                            /
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("*")}>
                            *
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleOperator("%")}>
                            %
                        </CalculatorButton>
                        <CalculatorButton buttonType="operator" onClick={() => handleSquareRoot()}>
                            sqrt
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
                        <CalculatorButton buttonType="number" onClick={() => handleNumber(".")}>
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
