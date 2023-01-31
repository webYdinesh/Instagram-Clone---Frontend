import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoading } from "../../redux/slices/appConfigSlice";
import { axiosInstance } from "../../Utils/AxiosClient";
import { setTokenFromLocalStorage } from "../../Utils/LocalStorageManager";
import { BlueButton } from "../buttons/Button";
import Logo from "../company-logo/Logo";
import Footer from "../footer/Footer";
import "./login.scss";
const Login = () => {
    const dispatch = useDispatch();

    //set value of input feilds
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    //to navigate
    const navigate = useNavigate();
    //InputHandler
    const InputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue({ ...inputValue, [name]: value });
    };
    //send data to backend
    const LoginHandler = async () => {
        try {
            dispatch(setIsLoading(true));

            const {
                message,
                status,
                result: { accessToken },
            } = await axiosInstance.post("/auth/login", {
                ...inputValue,
            });
            console.log(accessToken);
            if (status === "ok") {
                setTokenFromLocalStorage("authToken", accessToken);
                toast.success(message, {
                    position: "top-center",
                    theme: "dark",
                    autoClose: 3000,
                });
                navigate("/");
            } else {
                return toast.error(message, {
                    position: "top-center",
                    theme: "dark",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            return toast.error(error.message, {
                position: "top-center",
                theme: "dark",
                autoClose: 3000,
            });
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    //on submit actions
    const SubmitHandler = (e) => {
        e.preventDefault();
        const { email, password } = inputValue;
        if (!email || !password) {
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
        //Login Api Called
        LoginHandler();
    };
    return (
        <div className="login-container flex flex-column">
            <div className="login-wrapper flex flex-column">
                <Logo />
                <div className="login-title text-center">
                    <h5>Login with your Credentials</h5>
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
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={InputHandler}
                            value={inputValue.password}
                        />
                    </div>

                    <BlueButton title={"Log In"} />
                </form>

                <div className="login-redirect">
                    <span>
                        Have an account? <Link to="/signup">Sign up</Link>
                    </span>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
