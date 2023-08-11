import { ReactElement } from "react";
import { BasePanelProps } from "./BasePanel.props";
import "./BasePanel.scss";

export default function BasePanel(props: BasePanelProps): ReactElement {
    return <div className={"base-panel" + (props.className ? ` ${props.className}` : "")}>{props.children}</div>;
}
