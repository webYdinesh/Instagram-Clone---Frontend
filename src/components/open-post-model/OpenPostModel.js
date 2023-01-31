import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    setIsLoading,
    setIsSinglePostModel,
} from "../../redux/slices/appConfigSlice";
import { fetchPostLikedUser, postComment } from "../../redux/slices/postSlice";
import { axiosInstance } from "../../Utils/AxiosClient";
import CommentCard from "../comment-card/CommentCard";
import "./openpostmodel.scss";
const OpenPostModel = () => {
    const allPost = useSelector((state) => state.postReducer.allPost);
    const curUser = useSelector((state) => state.appConfigReducer.userProfile);
    const dispatch = useDispatch();
    const params = useParams();
    const [comment, setComment] = useState("");
    const [isLike, setIsLike] = useState(false);
    const [postData, setPostData] = useState({
        username: "",
        userAvatar: "",
        image: "",
        likes: [],
        postId: "",
        comments: [],
    });
    //fetch post data by ID
    const fetchPostData = async () => {
        try {
            dispatch(setIsLoading(true));
            const {
                result: { post },
            } = await axiosInstance.get(`post/${params.postId}`);
            setPostData({
                username: post?.owner?.username,
                userAvatar: post?.owner?.avatar?.url,
                image: post?.image?.url,
                likes: post?.likes,
                postId: post?._id,
                comments: post?.comments,
            });
        } catch (error) {
            Promise.reject(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    // to handle like and dislike
    const likeHandler = async (targetPostId) => {
        setIsLike(!isLike);
        await dispatch(fetchPostLikedUser({ targetPostId }));
        fetchPostData();
    };
    useEffect(() => {
        fetchPostData();
    }, [params.postId]);
    useEffect(() => {
        postData?.likes?.forEach((like) => {
            if (like?._id === curUser?._id) {
                setIsLike(true);
            } else {
                setIsLike(false);
            }
        });
    }, [postData, curUser]);
    //post comment on post
    const postCommentHandler = async (e) => {
        e.preventDefault();
        if (!comment) {
            return toast.error("Comment is required", {
                position: "top-center",
                theme: "dark",
                autoClose: 3000,
            });
        }
        await dispatch(postComment({ targetPostId: params.postId, comment }));
        fetchPostData();
        setComment("");
    };
    return (
        <div className="post-model-container flex">
            <div className="post-model-content-wrapper">
                <div className="post-model-image-side">
                    <img src={postData.image} alt="" />
                </div>
                <div className="post-model-left-section">
                    <div className="post-model-header flex">
                        <img src={postData.userAvatar} alt="" />
                        <h6>{postData.username}</h6>
                    </div>
                    <div className="post-model-description-comments">
                        <div className="post-model-description flex">
                            <img src={postData.userAvatar} alt="" />
                            <div className="description">
                                <span>{postData.username} &nbsp; </span>
                                <p>
                                    {allPost[2]?.caption} vdggdinesh dinghi hai
                                    usme koi matlvgggggggggggggggggggggggdinesh
                                    dinghi hai usme koi
                                    matlvgggggggggggggggggggggggdinesh dinghi
                                    hai usme koi matlvggggggggggggggggggggg
                                </p>
                            </div>
                        </div>
                        <div className="comment-container">
                            {postData?.comments.map((item, i) => {
                                return (
                                    <CommentCard postComment={item} key={i} />
                                );
                            })}
                        </div>
                    </div>
                    <div className="post-model-bottom-section">
                        <div className="user-react-section flex">
                            <div className="like-comment flex">
                                <button
                                    onClick={() => likeHandler(postData.postId)}
                                >
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
                                <button>
                                    <label htmlFor="comment">
                                        <FaRegComment
                                            size={25}
                                            color={"#fff"}
                                        />
                                    </label>
                                </button>
                            </div>
                            <button>
                                <HiOutlineBookmark size={27} color={"#fff"} />
                            </button>
                        </div>
                        <div className="post-model-footer">
                            <p>{` ${postData.likes?.length} likes`}</p>
                        </div>
                        <div className="comment-input">
                            <form
                                className="flex"
                                onSubmit={postCommentHandler}
                            >
                                <textarea
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    id="comment"
                                    placeholder="Add a comment..."
                                ></textarea>
                                <button type="submit">Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="close-btn">
                <button
                    onClick={() => {
                        dispatch(setIsSinglePostModel(false));
                    }}
                >
                    <AiOutlineClose fill="#ffffff" size={30} />
                </button>
            </div>
        </div>
    );
};

export default OpenPostModel;
