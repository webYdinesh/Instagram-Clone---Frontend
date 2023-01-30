import React from "react";
import { useNavigate } from "react-router-dom";
import "./avatar.scss";
const Avatar = ({ following }) => {
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate(`user/${following?._id}`);
    };
    return (
        <div className="avatar-container" onClick={navigateToProfile}>
            <button className="avatar flex flex-column">
                <img src={following?.avatar?.url} alt="profileImage" />
                <p>{following.username}</p>
            </button>
        </div>
    );
};

export default Avatar;
