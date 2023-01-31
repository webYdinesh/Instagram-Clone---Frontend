import axios from "axios";
import {
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage,
    setTokenFromLocalStorage,
} from "./LocalStorageManager";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
    const userToken = getTokenFromLocalStorage("authToken");
    request.headers.authorization = `Bearer ${userToken}`;
    return request;
});
axiosInstance.interceptors.response.use(
    async (response) => {
        const { data } = response;
        if (data.status === "ok") {
            return data;
        }
        const {
            config,
            data: { statusCode, message },
        } = response;
        if (statusCode === 401 && !config._retry) {
            config._retry = true;
            const response = await axios(
                "http://localhost:5000/api/v1/auth/refresh",
                { withCredentials: true }
            );
            if (response.data.status === "ok") {
                const refreshToken =
                    response.data.result.regeneratedAccessToken;
                setTokenFromLocalStorage("authToken", refreshToken);
                config.headers.authorization = `Bearer ${refreshToken}`;
                return axios(config);
            } else {
                removeTokenFromLocalStorage("authToken");
                window.location.replace("/home", "_self");
                return Promise.reject(message);
            }
        }
        removeTokenFromLocalStorage("authToken");
        window.location.replace("/home", "_self");
        return Promise.reject(message);
    },
    (err) => {
        return Promise.reject(err);
    }
);
