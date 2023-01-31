import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosInstance } from "./AxiosClient";

const RequireUserAuth = () => {
    const navigate = useNavigate();
    const RequireUserHandler = async () => {
        const { status } = await axiosInstance("/user/profile/me");
        if (status === "ok") {
            return navigate("/");
<<<<<<< HEAD
        } else {
            navigate("/home");
=======
        }else{
            
        navigate("/home");
>>>>>>> 5e371d2a6b6f966551a8f55c09c0ed3b47eb3b73
        }
    };
    useEffect(() => {
        RequireUserHandler();
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
};

export default RequireUserAuth;
