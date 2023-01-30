import React, { useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { BsBookmarkFill, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { HiOutlineBookmark } from "react-icons/hi";
import "./singlepost.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    bookmarkPost,
    fetchAllPost,
    fetchPostLikedUser,
} from "../../redux/slices/postSlice";
import {
    fetchProfile,
    setIsSinglePostModel,
} from "../../redux/slices/appConfigSlice";
import { Link, useNavigate } from "react-router-dom";
import PostOptionModel from "../post-options-model/PostOptionModel";
const SinglePost = ({
    postDetails: {
        image,
        caption,
        likes,
        _id,
        owner: { avatar, username },
        owner,
    },
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLike, setIsLike] = useState(false);
    const [isoptionModel, setIsOptionModel] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const curUser = useSelector((state) => state.appConfigReducer.userProfile);

    // to handle like and dislike
    const likeHandler = async (targetPostId) => {
        setIsLike(!isLike);
        await dispatch(fetchPostLikedUser({ targetPostId }));
        dispatch(fetchAllPost());
    };
    useEffect(() => {
        likes.forEach((like) => {
            if (like?._id === curUser?._id) {
                setIsLike(true);
            } else {
                setIsLike(false);
            }
        });
    }, [likes, curUser?._id]);
    //navigate to profile
    const navigateHandler = () => {
        if (owner._id === curUser._id) {
            navigate("/profile");
        } else {
            navigate(`/user/${owner._id}`);
        }
    };

    //handle bookmark
    const bookmarkHandler = async () => {
        setIsSaved(!isSaved);
        await dispatch(bookmarkPost({ targetPostId: _id }));
        dispatch(fetchProfile());
    };
    useEffect(() => {
        curUser?.savedPost?.forEach((post) => {
            if (post?._id === _id) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        });
    }, [_id, curUser?.savedPost]);
    return (
        <div className="single-post-container">
            <div className="single-post">
                <div className="signle-post-header flex">
                    <div className="signle-post-header-left flex">
                        <img
                            onClick={navigateHandler}
                            src={avatar?.url}
                            alt="avatar"
                        />
                        <div className="inner-text">
                            <h6 onClick={navigateHandler}>{username}</h6>
                            <span>Public . 1d</span>
                        </div>
                    </div>
                    <div className="post-setting">
                        <button onClick={() => setIsOptionModel(true)}>
                            <BiDotsHorizontalRounded size={30} color="#fff" />
                        </button>
                    </div>
                </div>
                <div
                    className="post-image-section"
                    onDoubleClick={() => likeHandler(_id)}
                >
                    <img src={image.url} alt="PostImage" />
                </div>
                <div className="user-react-section flex">
                    <div className="like-comment flex">
                        <button onClick={() => likeHandler(_id)}>
                            {isLike ? (
                                <BsFillHeartFill
                                    className="like-icon"
                                    size={25}
                                    fill={"red"}
                                />
                            ) : (
                                <BsHeart size={25} fill={"#fff"} />
                            )}
                        </button>
                        <Link to={`/post/${_id}`}>
                            <button
                                onClick={() => {
                                    dispatch(setIsSinglePostModel(true));
                                }}
                            >
                                <FaRegComment size={25} color={"#fff"} />
                            </button>
                        </Link>
                    </div>
                    <button onClick={bookmarkHandler}>
                        {isSaved ? (
                            <BsBookmarkFill size={27} color={"#fff"} />
                        ) : (
                            <HiOutlineBookmark size={27} color={"#fff"} />
                        )}
                    </button>
                </div>
                <div className="post-footer">
                    <p>{`${likes?.length} likes`}</p>
                </div>

                <div className="post-caption">
                    <p>
                        <span>{username}</span> &nbsp;
                        {caption}
                    </p>
                </div>
            </div>
            {isoptionModel && (
                <PostOptionModel
                    close={setIsOptionModel}
                    postId={_id}
                    ownerId={owner._id}
                />
            )}
        </div>
    );
};

export default SinglePost;
