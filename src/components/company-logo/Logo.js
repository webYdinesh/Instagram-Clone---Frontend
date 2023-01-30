import React from "react";
import companylogo from "../../images/companylogo.png";
import "./logo.scss";
const Logo = ({ width }) => {
    const customizeLogo = {
        width,
    };
    return (
        <div className="logo">
            <img style={customizeLogo} src={companylogo} alt="companylogo" />
        </div>
    );
};

export default Logo;
