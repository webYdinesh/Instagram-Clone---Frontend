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
        }else{
            
        navigate("/home");
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
