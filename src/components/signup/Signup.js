import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BlueButton } from "../buttons/Button";
import Logo from "../company-logo/Logo";
import Footer from "../footer/Footer";
import "./signup.scss";
import { axiosInstance } from "../../Utils/AxiosClient";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/slices/appConfigSlice";
const Signup = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    //set value of input feilds
    const [inputValue, setInputValue] = useState({
        email: "",
        fullName: "",
        username: "",
        password: "",
    });
    //InputHandler
    const InputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    //send data to backend
    const SendDataHandler = async () => {
        try {
            dispatch(setIsLoading(true));

            const response = await axiosInstance.post("/auth/signup", {
                ...inputValue,
            });
            navigate("/login");
        } catch (error) {
            return toast.error(error.message, {
                position: "top-center",
                theme: "dark",
                autoClose: 8000,
            });
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    //on submit actions
    const SubmitHandler = (e) => {
        e.preventDefault();
        const { email, fullName, username, password } = inputValue;
        if (!email || !fullName || !username || !password) {
            return toast.error("All feilds are required.", {
                position: "top-center",
                theme: "light",
                autoClose: 8000,
            });
        }
        if (
            !email.match(
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
        ) {
            return toast.error("E-mail is Invalid.", {
                position: "top-center",
                theme: "dark",
                autoClose: 8000,
            });
        }

        //call api to send data to backend
        SendDataHandler();
    };
    return (
        <div className="signup-container flex flex-column">
            <div className="signup-wrapper flex flex-column">
                <Logo />
                <div className="signup-title text-center">
                    <h5>Sign up to see photos and videos from your friends.</h5>
                </div>
                <form className="flex flex-column" onSubmit={SubmitHandler}>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email address"
                            onChange={InputHandler}
                            value={inputValue.email}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="fullName"
                            id="fullname"
                            placeholder="Full Name"
                            onChange={InputHandler}
                            value={inputValue.fullName}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            onChange={InputHandler}
                            value={inputValue.username}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={InputHandler}
                            value={inputValue.password}
                        />
                    </div>
                    <span className="text-center">
                        People who use our service may have uploaded your
                        contact information to Instagram.
                        <a
                            href="https://help.instagram.com/1896641480634370"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Learn more
                        </a>
                        <br />
                        <br /> By signing up, you agree to our
                        <a
                            href="https://www.facebook.com/help/instagram/261704639352628"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Terms
                        </a>
                        ,
                        <a
                            href="https://help.instagram.com/581066165581870/?locale=en_GB"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Privacy Policy
                        </a>
                        and
                        <a
                            href="https://help.instagram.com/1896641480634370/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Cookies Policy.
                        </a>
                    </span>
                    <BlueButton title={"Sign Up"} />
                </form>

                <div className="login-redirect">
                    <span>
                        Have an account? <Link to="/login">Log in</Link>
                    </span>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
