import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userfollowmodel.scss";
const UserFollowCard = ({ userAvatar, username, fullName, _id, close }) => {
    const { userProfile } = useSelector((state) => state.appConfigReducer);
    const navigate = useNavigate();
    //navigate to profile
    const navigateHandler = () => {
        if (_id === userProfile._id) {
            navigate("/profile");
            close(false);
        } else {
            navigate(`/user/${_id}`);
            close(false);
        }
    };
    return (
        <div className="user-container flex">
            <div className="user-img-username flex">
                <div className="user-img">
                    <img src={userAvatar} alt="userimage" />
                </div>
                <div className="user-name">
                    <h6>{username}</h6>
                    <span>{fullName}</span>
                </div>
            </div>

            <div className="model-btn">
                <button onClick={navigateHandler}>See Profile</button>
            </div>
        </div>
    );
};

export default UserFollowCard;
