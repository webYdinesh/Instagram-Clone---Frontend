import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getTokenFromLocalStorage } from "./LocalStorageManager";

const UnauthorizedUser = () => {
    const getAccessKey = getTokenFromLocalStorage("authToken");

    return getAccessKey ? <Navigate to="/" /> : <Outlet />;
};

export default UnauthorizedUser;
