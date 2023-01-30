import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsReelUploadModel } from "../../redux/slices/appConfigSlice";
import { createReel } from "../../redux/slices/reelSlice";
import "./uploadreelmodel.scss";
const UploadReelModel = () => {
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sharebtnRef = useRef();
    const reelVideoHandler = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setVideo(fileReader.result);
            }
        };
    };
    //dispatch upload reel reducer
    const shareReelHandler = async () => {
        sharebtnRef.current.disabled = true;
        await dispatch(createReel({ video }));
        navigate("/reels");
        document.title = "Instagram · Reels";
        dispatch(setIsReelUploadModel(false));
    };
    return (
        <div className="upload-reels-model-container flex">
            <div className="upload-reels-wrapper ">
                <div
                    className={
                        video
                            ? "reels-upload-header flex"
                            : "reels-upload-header"
                    }
                >
                    {video && (
                        <div className="cancel-btn">
                            <button onClick={() => setVideo(null)}>
                                Cancel
                            </button>
                        </div>
                    )}

                    <h5 className="text-center">Create new post</h5>
                    {video && (
                        <div className="share-btn">
                            <button
                                ref={sharebtnRef}
                                onClick={shareReelHandler}
                            >
                                Share
                            </button>
                        </div>
                    )}
                </div>
                <div className="reels-model-body flex">
                    {video ? (
                        <video src={video} controls></video>
                    ) : (
                        <>
                            <label htmlFor="uploadreel" className="flex">
                                <MdOutlineSlowMotionVideo size={19} /> &nbsp;
                                Select Reel Video
                            </label>
                            <input
                                type="file"
                                name="reel"
                                accept="video/*"
                                id="uploadreel"
                                onChange={reelVideoHandler}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="close-btn">
                <button
                    onClick={() => {
                        document.title = "Instagram";
                        dispatch(setIsReelUploadModel(false));
                    }}
                >
                    <AiOutlineClose fill="#ffffff" size={30} />
                </button>
            </div>
        </div>
    );
};

export default UploadReelModel;
