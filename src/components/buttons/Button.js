import React from "react";
import "./Button.scss";
const BlueButton = ({ title, ref }) => {
    return (
        <>
            <div className="blue-button">
                <button ref={ref}>{title}</button>
            </div>
        </>
    );
};

export { BlueButton };
