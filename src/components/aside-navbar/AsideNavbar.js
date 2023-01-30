import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../company-logo/Logo";
import "./asidenavbar.scss";
import { AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import UploadModel from "../upload-model/UploadModel";
import { useDispatch, useSelector } from "react-redux";
import {
    logoutUser,
    setIsReelUploadModel,
    setIsUploadModel,
} from "../../redux/slices/appConfigSlice";
import UploadReelModel from "../upload-reel-model/UploadReelModel";
import SearchModel from "../searchModel.js/SearchModel";
import { removeTokenFromLocalStorage } from "../../Utils/LocalStorageManager";
const AsideNavbar = () => {
    const dispatch = useDispatch();
    const isUploadModel = useSelector(
        (state) => state.appConfigReducer.isUploadModel
    );
    const isReelUploadModel = useSelector(
        (state) => state.appConfigReducer.isReelUploadModel
    );
    const [isSearchModel, setIsSearchModel] = useState(false);
    const ModelHandler = () => {
        dispatch(setIsUploadModel(true));
        document.title = "Create new post · Instagram";
    };
    const logoutHandler = async () => {
        await dispatch(logoutUser());
        removeTokenFromLocalStorage("authToken");
        window.location.replace("/home", "_self");
    };
    return (
        <>
            <aside className="aside-navbar flex flex-column">
                <Logo width={"10rem"} />
                <nav className="nav-content">
                    <ul className="flex flex-column">
                        <li>
                            <NavLink className={"flex"} to={"/"}>
                                <AiFillHome size={25} /> Home
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                className={"flex"}
                                onClick={() => {
                                    document.title = "Instagram · Search";
                                    setIsSearchModel(true);
                                }}
                            >
                                <HiOutlineSearch size={25} /> Search
                            </Link>
                        </li>

                        <li>
                            <NavLink className={"flex"} to={"reels"}>
                                <MdOutlineSlowMotionVideo size={25} /> Reels
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                className={"flex"}
                                onClick={() => {
                                    document.title = "Instagram · Create Reel";
                                    dispatch(setIsReelUploadModel(true));
                                }}
                            >
                                <MdOutlineSlowMotionVideo size={25} /> Post
                                Reels
                            </Link>
                        </li>
                        <li>
                            <Link className={"flex"} onClick={ModelHandler}>
                                <AiOutlinePlusSquare size={25} /> Create
                            </Link>
                        </li>
                        <li>
                            <NavLink className={"flex"} to={"/profile"}>
                                <RxAvatar size={25} /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <Link className={"flex"} onClick={logoutHandler}>
                                <IoLogOutOutline size={25} /> Log out
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            {isUploadModel && <UploadModel />}
            {isSearchModel && <SearchModel close={setIsSearchModel} />}
            {isReelUploadModel && <UploadReelModel />}
        </>
    );
};

export default AsideNavbar;
