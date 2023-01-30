import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProfile } from "../../redux/slices/appConfigSlice";
import { followUnfollowUser } from "../../redux/slices/userSlice";

import "./suggestioncard.scss";
const SuggestionCard = ({ username, image, userId }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const userProfile = useSelector(
        (state) => state.appConfigReducer.userProfile
    );
    const dispatch = useDispatch();
    //followUnfollowHandler
    const followUnfollowHandler = async () => {
        setIsFollowed(!isFollowed);
        await dispatch(followUnfollowUser({ targetUserId: userId }));
        dispatch(fetchProfile());
    };
    useEffect(() => {
        userProfile?.followings?.forEach((user) => {
            if (user?._id === userId) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        });
    }, [userProfile?.followers, userId, isFollowed]);
    return (
        <div className="suggestion-user-profile flex">
            <div className="image-text-wrapper flex ">
                <Link to={`/user/${userId}`}>
                    <div className="profile-image">
                        <img src={image} alt="profilepic" />
                    </div>
                </Link>
                <div className="text">
                    <Link to={`/user/${userId}`}>
                        <h6>{username}</h6>
                    </Link>
                    <p>suggested for you</p>
                </div>
            </div>
            <div className="profile-btn">
                <button onClick={followUnfollowHandler}>
                    {isFollowed ? "Unfollow" : "Follow"}
                </button>
            </div>
        </div>
    );
};

export default SuggestionCard;
