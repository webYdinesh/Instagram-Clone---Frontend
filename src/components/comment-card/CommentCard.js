import React from "react";
import "./commentcard.scss";
const CommentCard = ({
    postComment: {
        comment,
        user: {
            avatar: { url },
            username,
        },
    },
}) => {
    return (
        <div className="comment-card-container flex">
            <img src={url} alt="avatar" />
            <div className="comment">
                <span>{username} &nbsp; </span>
                <p>{comment}</p>
                <div className="timestamp">
                    <small>1 d</small>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
