import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchAllPost } from "../../redux/slices/postSlice";
import "./postoptionmodel.scss";
const PostOptionModel = ({ close, postId, ownerId }) => {
    const deletebtnRef = useRef();
    const dispatch = useDispatch();
    const deletePostHandler = async (id) => {
        deletebtnRef.current.disabled = true;
        await dispatch(deletePost({ targetPostId: id }));
        await dispatch(fetchAllPost());
        close(false);
    };
    const curUser = useSelector((state) => state.appConfigReducer.userProfile);

    return (
        <div className="PostOptionModel-container flex">
            <div className="post-option-wrapper flex flex-column">
                <button>Copy Link</button>
                {curUser?._id === ownerId && (
                    <button
                        ref={deletebtnRef}
                        className="delete"
                        onClick={() => deletePostHandler(postId)}
                    >
                        Delete Post
                    </button>
                )}

                <button onClick={() => close(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default PostOptionModel;
