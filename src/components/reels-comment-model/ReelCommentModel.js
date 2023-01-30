import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReels, postCommentOnReel } from "../../redux/slices/reelSlice";
import "./reelcommentmodel.scss";
const ReelCommentModel = ({ reelData, close }) => {
    const user = useSelector((state) => state.appConfigReducer.userProfile);
    const dispatch = useDispatch();
    const [reelComment, setReelComment] = useState("");
    const commentSubmitHandler = async (e) => {
        e.preventDefault();
        await dispatch(
            postCommentOnReel({
                targetReelId: reelData?._id,
                comment: reelComment,
            })
        );
        setReelComment("");
        dispatch(fetchAllReels());
    };
    console.log(reelData?.comments);
    return (
        <div className="reel-comment-model-container flex">
            <div className="reel-comment-wrapper">
                <div className="reel-model-header text-center">
                    <h5>Comments</h5>
                </div>
                <div
                    className={
                        reelData?.comments?.length === 0
                            ? "reel-comments-container flex flex-column"
                            : "reel-comments-container"
                    }
                >
                    {reelData && reelData?.comments?.length > 0 ? (
                        reelData?.comments?.map((item, i) => {
                            return (
                                <div
                                    className="comment-card-container  flex "
                                    key={i}
                                >
                                    <img
                                        src={item.user?.avatar.url}
                                        alt="avatar"
                                    />
                                    <div className="comment">
                                        <span>
                                            {item.user?.username} &nbsp;{" "}
                                        </span>
                                        <p>{item.comment}</p>
                                        <div className="timestamp">
                                            <small>1 d</small>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <h5>No comments yet</h5>
                            <span>Be the first to comment on this.</span>
                        </>
                    )}
                </div>
                <div className="comment-input flex">
                    <div className="user-avatar">
                        <img src={user?.avatar?.url} alt="user" />
                    </div>
                    <form className="flex" onSubmit={commentSubmitHandler}>
                        <textarea
                            name="comment"
                            id="comment"
                            placeholder="Add a comment..."
                            value={reelComment}
                            onChange={(e) => setReelComment(e.target.value)}
                        ></textarea>
                        {reelComment && <button type="submit">Post</button>}
                    </form>
                </div>
            </div>
            <div className="close-btn">
                <button
                    onClick={() => {
                        close(false);
                    }}
                >
                    <AiOutlineClose fill="#ffffff" size={30} />
                </button>
            </div>
        </div>
    );
};

export default ReelCommentModel;
