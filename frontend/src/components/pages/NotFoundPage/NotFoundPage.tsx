import BaseButton from "../../ui/BaseButton/BaseButton";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

export default function NotFoundPage(): ReactElement {
    const navigate = useNavigate();
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <div>It seems the page you are trying to access does not exist.</div>
            <BaseButton buttonType="primary" onClick={() => navigate("/calculator")}>
                Get me out of here!
            </BaseButton>
        </div>
    );
}
