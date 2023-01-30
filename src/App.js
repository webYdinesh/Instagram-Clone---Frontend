import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import LandingPage from "./components/landing-page/LandingPage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./pages/home/Home";
import Error from "./pages/error/Error";
import RequireUserAuth from "./Utils/RequireUserAuth";
import Profile from "./pages/profile/Profile";
import Feed from "./components/feed/Feed";
import ProfileEdit from "./pages/update-profile/ProfileEdit";
// React Toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//Loading-bar
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import UnauthorizedUser from "./Utils/UnauthorizedUser";
import Reels from "./pages/Reels/Reels";
import UploadReelModel from "./components/upload-reel-model/UploadReelModel";

function App() {
    const loading = useRef();
    const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

    useEffect(() => {
        if (isLoading) {
            loading?.current?.continuousStart();
        } else {
            loading?.current?.complete();
        }
    }, [isLoading]);

    return (
        <>
            <div>
                <ToastContainer
                    position="top-center"
                    limit={3}
                    theme="colored"
                    autoClose={8000}
                />
            </div>
            <div>
                <LoadingBar color="#E1306C" height={3} ref={loading} />
            </div>
            <BrowserRouter>
                <Routes>
                    <Route element={<RequireUserAuth />}>
                        <Route exect path="/" element={<Home />}>
                            <Route exect path="/" element={<Feed />} />

                            <Route
                                exect
                                path="/profile"
                                element={<Profile />}
                            />

                            <Route
                                exect
                                path="/account/edit"
                                element={<ProfileEdit />}
                            />
                            <Route
                                exect
                                path="/user/:userId"
                                element={<Profile />}
                            />
                            <Route
                                exect
                                path="/post/:postId"
                                element={<Profile />}
                            />
                            <Route exect path="/reels" element={<Reels />} />
                        </Route>
                        <Route
                            exect
                            path="/post/reels"
                            element={<UploadReelModel />}
                        />
                    </Route>

                    <Route element={<UnauthorizedUser />}>
                        <Route exect path="/home" element={<LandingPage />} />
                        <Route exect path="/signup" element={<Signup />} />
                        <Route exect path="/login" element={<Login />} />
                    </Route>

                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
