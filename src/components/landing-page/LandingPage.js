import React from "react";
import lpImg2 from "../../images/lp-img-2.png";
import Footer from "../footer/Footer";
import "./landingpage.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../company-logo/Logo";
const LandingPage = () => {
    const navigate = useNavigate();
    const goToSignup = () => {
        navigate("/signup");
    };
    const goToLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <section className="landing flex flex-column">
                <div className="landing-section flex">
                    <div className="background landing-overlay-bg ">
                        <img src={lpImg2} alt="landingimage" />
                    </div>
                    <div className="landing-right-side flex">
                        <div className="login-signup-wrapper flex flex-column">
                            <Logo />
                            <div className="button-box flex flex-column">
                                <button onClick={goToSignup}>
                                    Create new account
                                </button>
                                <button onClick={goToLogin}>
                                    Login with existing account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    );
};

export default LandingPage;
