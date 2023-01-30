import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../../redux/slices/userSlice";
import SuggestionCard from "../suggestion-card/SuggestionCard";
import "./followsuggestion.scss";
const FollowSuggestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        profileImage: "",
        username: "",
        fullName: "",
    });
    const userProfile = useSelector(
        (state) => state.appConfigReducer.userProfile
    );
    const allUser = useSelector((state) => state.userReducer.users);
    useEffect(() => {
        setUser({
            ...user,
            profileImage: userProfile?.avatar?.url || "",
            username: userProfile?.username || "",
            fullName: userProfile?.fullName || "",
        });
        dispatch(fetchAllUsers());
    }, [userProfile]);

    return (
        <div className="suggestion-container">
            <div className="user-profile flex">
                <div className="image-text-wrapper flex ">
                    <div
                        className="profile-image"
                        onClick={() => navigate("/profile")}
                    >
                        <img src={user?.profileImage} alt="profilepic" />
                    </div>
                    <div className="text">
                        <h6 onClick={() => navigate("/profile")}>
                            {user?.username}
                        </h6>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
                <div className="profile-btn">
                    <button
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        Profile
                    </button>
                </div>
            </div>
            <div className="suggestion-text flex">
                <p>Suggestions for you</p>
                <button
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    See All
                </button>
            </div>
            <div className="follow-suggestions-container">
                {allUser?.map(({ username, avatar: { url }, _id }) => {
                    return (
                        <SuggestionCard
                            key={_id}
                            username={username}
                            image={url}
                            userId={_id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FollowSuggestion;
