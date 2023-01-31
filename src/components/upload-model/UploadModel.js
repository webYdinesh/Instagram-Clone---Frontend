import React, { useRef, useState } from "react";
import { BsArrowLeft, BsEmojiSmile, BsImage } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import "./uploadmodel.scss";
import { axiosInstance } from "../../Utils/AxiosClient";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProfile,
    setIsLoading,
    setIsUploadModel,
} from "../../redux/slices/appConfigSlice";
import { toast } from "react-toastify";
const UploadModel = () => {
    //hooks
    const dispatch = useDispatch();
    const sharebtnRef = useRef();
    const userProfile = useSelector(
        (state) => state.appConfigReducer.userProfile
    );
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    //back handler
    const backHandler = () => {
        setImage(null);
    };
    //image preview handler
    const fileHandler = async (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setImage(fileReader.result);
            }
        };
    };
    //upload new post
    const uploadPostHandler = async () => {
        try {
            dispatch(setIsLoading(true));
            sharebtnRef.current.disabled = true;
            const response = await axiosInstance.post("post/createpost", {
                image,
                caption,
            });
            toast.success("post uploaded successfully", {
                position: "top-center",
                theme: "dark",
                autoClose: 4000,
            });
            await dispatch(fetchProfile());
            dispatch(setIsUploadModel(false));
        } catch (error) {
            Promise.reject(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    return (
        <div className="upload-model-container flex">
            <div className="inner-model">
                <div
                    className={`model-header text-center ${
                        image && "imageActive"
                    }`}
                >
                    {image && (
                        <button onClick={backHandler}>
                            <BsArrowLeft size={20} fill={"#ffffff"} />
                        </button>
                    )}
                    <h5>Create new post</h5>
                    {image && (
                        <button ref={sharebtnRef} onClick={uploadPostHandler}>
                            Share
                        </button>
                    )}
                </div>
                <div
                    className={` ${
                        image ? "grid-model" : "model-body flex flex-column"
                    }`}
                >
                    {image ? (
                        <>
                            <div className="image-preview-side">
                                <img src={image} alt="image" />
                            </div>
                            <div className="post-caption-side">
                                <div className="user-profile flex">
                                    <img
                                        src={userProfile?.avatar?.url}
                                        alt="user-avatar"
                                    />
                                    <p>{userProfile?.username}</p>
                                </div>
                                <div className="caption-input">
                                    <textarea
                                        name="caption"
                                        placeholder="Write a caption..."
                                        value={caption}
                                        onChange={(e) =>
                                            setCaption(e.target.value)
                                        }
                                    ></textarea>
                                </div>
                                <div className="emoji-section flex">
                                    <button>
                                        <BsEmojiSmile
                                            size={20}
                                            color="#ffffff"
                                        />
                                    </button>
                                    <div className="word-count">
                                        <span>
                                            <span>40</span>/2200
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="model-icon">
                                <BsImage size={70} color="#ffffff" />
                            </div>
                            <span>Drag photos and videos here</span>
                            <label htmlFor="selectfile">
                                Select From Computer
                            </label>
                            <input
                                type="file"
                                name="images"
                                id="selectfile"
                                accept="image/jpeg,jpg,png"
                                onChange={fileHandler}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="close-btn">
                <button
                    onClick={() => {
                        document.title = "Instagram";
                        dispatch(setIsUploadModel(false));
                    }}
                >
                    <AiOutlineClose fill="#ffffff" size={30} />
                </button>
            </div>
        </div>
    );
};

export default UploadModel;
