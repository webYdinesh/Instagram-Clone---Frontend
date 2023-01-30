import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AsideNavbar from "../../components/aside-navbar/AsideNavbar";
import OpenPostModel from "../../components/open-post-model/OpenPostModel";
import PostOptionModel from "../../components/post-options-model/PostOptionModel";
import { fetchProfile } from "../../redux/slices/appConfigSlice";
import "./home.scss";
const Home = () => {
    const dispatch = useDispatch();
    const isSinglePostModel = useSelector(
        (state) => state.appConfigReducer.isSinglePostModel
    );
    const optionModel = useSelector((state) => state.postReducer.optionModel);
    useEffect(() => {
        document.title = "Instagram · Home";
        dispatch(fetchProfile());
    }, []);
    return (
        <>
            <main className="home-section flex">
                <div className="aside-navbar-wraper">
                    <AsideNavbar />
                </div>
                <Outlet />
            </main>
            {isSinglePostModel && <OpenPostModel />}
            {optionModel && <PostOptionModel />}
        </>
    );
};

export default Home;
