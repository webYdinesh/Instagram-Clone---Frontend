import React, { useEffect, useRef, useState } from "react";

import "./reels.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllReels,
    fetchReelLikedUser,
} from "../../redux/slices/reelSlice";
import {
    BsCaretDownSquareFill,
    BsCaretUpSquareFill,
    BsFillHeartFill,
    BsHeart,
} from "react-icons/bs";
import { FaPlay, FaRegComment } from "react-icons/fa";
import { BiVolumeMute } from "react-icons/bi";
import { GoUnmute } from "react-icons/go";
import { HiOutlineBookmark } from "react-icons/hi";
import ReelCommentModel from "../../components/reels-comment-model/ReelCommentModel";
const Reels = () => {
    const dispatch = useDispatch();
    const reels = useSelector((state) => state.reelReducer.allReels);
    const curUser = useSelector((state) => state.appConfigReducer.userProfile);
    const [reelData, setReelData] = useState(reels);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef();
    const [isLiked, setIsLiked] = useState(false);
    const [isCommentActive, setIsCommentActive] = useState(false);
    //dispatch to fetch all reels
    useEffect(() => {
        dispatch(fetchAllReels());
    }, []);

    useEffect(() => {
        setReelData(reels);
    }, [reels]);
    const [currentVideoPlaying, setCurrentVideoPlaying] = useState(0);
    const nextHandler = () => {
        if (currentVideoPlaying > reelData.length - 1) {
            setCurrentVideoPlaying(reelData.length - 1);
        } else {
            setCurrentVideoPlaying(currentVideoPlaying + 1);
        }
    };
    const prevHandler = () => {
        if (currentVideoPlaying <= 0) {
            setCurrentVideoPlaying(0);
        } else {
            setCurrentVideoPlaying(currentVideoPlaying - 1);
        }
    };
    const muteHandler = () => {
        setIsMuted(!isMuted);
    };
    useEffect(() => {
        if (!isPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isPlaying, currentVideoPlaying]);

    //to handle like and dislike
    const likeHandler = async () => {
        setIsLiked(!isLiked);
        await dispatch(
            fetchReelLikedUser({
                targetReelId: reels[currentVideoPlaying]?._id,
            })
        );
        dispatch(fetchAllReels());
    };
    useEffect(() => {
        reels &&
            reels[currentVideoPlaying]?.likes?.forEach((like) => {
                if (like?._id === curUser?._id) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            });
    }, [reels && reels[currentVideoPlaying]?.likes, curUser?._id]);
    return (
        <div className="reels-container flex">
            <div className="reel-video-wrapper flex">
                <div className="video-container">
                    <video
                        loop
                        ref={videoRef}
                        src={reels && reels[currentVideoPlaying]?.video?.url}
                        autoPlay
                        muted={isMuted ? true : false}
                    ></video>
                    <div
                        className={
                            !isPlaying
                                ? "play-pause-btn flex isPlaying"
                                : "play-pause-btn flex"
                        }
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying && (
                            <button className="flex">
                                <FaPlay size={40} fill={"#fff"} />
                            </button>
                        )}
                    </div>
                    <div className="muted-btn flex">
                        <button className="flex" onClick={muteHandler}>
                            {isMuted ? (
                                <BiVolumeMute size={15} fill={"#fff"} />
                            ) : (
                                <GoUnmute size={15} fill={"#fff"} />
                            )}
                        </button>
                    </div>
                </div>
                <div className="left-sidebar flex flex-column">
                    <div className="btn-container flex flex-column">
                        <button onClick={prevHandler}>
                            <BsCaretUpSquareFill size={30} fill={"#fff"} />
                        </button>
                        <button onClick={nextHandler}>
                            <BsCaretDownSquareFill size={30} fill={"#fff"} />
                        </button>
                    </div>
                    <div className="reel-react-section flex flex-column">
                        <div className="like-comment flex flex-column">
                            <div className="like-btn flex flex-column">
                                <button onClick={likeHandler}>
                                    {isLiked ? (
                                        <BsFillHeartFill
                                            className="like-icon"
                                            size={25}
                                            fill={"red"}
                                        />
                                    ) : (
                                        <BsHeart size={25} fill={"#fff"} />
                                    )}
                                </button>
                                <span>
                                    {reels &&
                                        reels[currentVideoPlaying]?.likes
                                            ?.length}
                                </span>
                            </div>

                            <div className="comment-btn flex flex-column">
                                <button
                                    onClick={() => setIsCommentActive(true)}
                                >
                                    <FaRegComment size={27} color={"#fff"} />
                                </button>
                                <span>
                                    {reels &&
                                        reels[currentVideoPlaying]?.comments
                                            ?.length}
                                </span>
                            </div>
                        </div>
                        <button>
                            <HiOutlineBookmark size={27} color={"#fff"} />
                        </button>
                    </div>
                </div>
            </div>
            {isCommentActive && (
                <ReelCommentModel
                    reelData={reels && reels[currentVideoPlaying]}
                    close={setIsCommentActive}
                />
            )}
        </div>
    );
};

export default Reels;
