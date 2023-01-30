import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Userpic from "../../images/avatar-11.jpg";
import { updateProfile } from "../../redux/slices/appConfigSlice";
import "./profileedit.scss";
const ProfileEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updatebtnRef = useRef();
    const userProfile = useSelector(
        (state) => state.appConfigReducer.userProfile
    );
    const [updateData, setUpdateData] = useState({
        updatedName: "",
        updatedBio: "",
        updatedImage: "",
    });
    const updateHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdateData({ ...updateData, [name]: value });
    };
    useEffect(() => {
        setUpdateData({
            updatedName: userProfile?.fullName || "",
            updatedBio: userProfile?.bio || "",
            updatedImage: userProfile?.avatar?.url,
        });
    }, [userProfile]);
    //imageHandler => fileReader
    const imageHandler = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUpdateData({
                    ...updateData,
                    updatedImage: fileReader?.result || "",
                });
            }
        };
    };
    //dispatch update profile
    const updateProfileHandler = async (e) => {
        e.preventDefault();

        updatebtnRef.current.disabled = true;
        await dispatch(updateProfile({ ...updateData }));
        setUpdateData({
            updatedName: "",
            updatedBio: "",
            updatedImage: "",
        });
        navigate("/profile");
    };
    return (
        <div className="profile-edit-container flex ">
            <section className="profile-edit-section flex flex-column">
                <div className="profile-edit-top-section flex flex-column">
                    <div className="profile-img flex flex-column">
                        <label htmlFor="update-img">
                            <img
                                src={
                                    updateData.updatedImage
                                        ? updateData.updatedImage
                                        : Userpic
                                }
                                alt="userProfile"
                            />
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg,jpg,png"
                            name="updatedImage"
                            id="update-img"
                            onChange={imageHandler}
                        />
                    </div>
                    <div className="profile-username flex">
                        <h5>dineshbisht.07</h5>
                    </div>
                    <div className="change-btn">
                        <label htmlFor="update-img">Change profile pic</label>
                    </div>
                </div>
                <div className="update-name-bio flex">
                    <form className="flex flex-column">
                        <div className="name-input input-wrapper flex">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="updatedName"
                                id="name"
                                onChange={updateHandler}
                                value={updateData.updatedName}
                            />
                        </div>
                        <div className="bio-input input-wrapper flex">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                name="updatedBio"
                                id="bio"
                                cols="30"
                                rows="10"
                                onChange={updateHandler}
                                value={updateData.updatedBio}
                                placeholder="Write your bio..."
                            ></textarea>
                        </div>
                        <div className="update-btn">
                            <button
                                type="submit"
                                onClick={updateProfileHandler}
                                ref={updatebtnRef}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ProfileEdit;
