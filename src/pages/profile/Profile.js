import React, { useEffect, useState } from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { SlCamera } from "react-icons/sl";
import { HiOutlineBookmark } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "../../components/footer/Footer";
import "./profile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProfile,
    setIsLoading,
    setIsSinglePostModel,
    setIsUploadModel,
} from "../../redux/slices/appConfigSlice";
import { axiosInstance } from "../../Utils/AxiosClient";
import { followUnfollowUser } from "../../redux/slices/userSlice";
import UserFollowCard from "../../components/user-follow-model/UserFollowCard";

const Profile = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const params = useParams();
    const userProfile = useSelector(
        (state) => state.appConfigReducer.userProfile
    );

    const [userProfileData, setUserProfileData] = useState({
        pic: "",
        username: "",
        fullName: "",
        posts: [],
        followers: [],
        followings: "",
        bio: "",
        userId: "",
        savedPost: [],
    });
    const [isMyProfile, setisMyProfile] = useState(true);
    const [isPostActive, setIsPostActive] = useState(true);
    const [isSavedActive, setIsSavedActive] = useState(false);
    const [isFollowersModelActive, setIsFollowersModelActive] = useState(false);
    const [isFollowingsModelActive, setIsFollowingsModelActive] =
        useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const activeHandler = () => {
        setIsPostActive(!isPostActive);
        setIsSavedActive(!isSavedActive);
    };
    const navigateHandler = () => {
        dispatch(setIsLoading(true));
        navigate("/account/edit");
        dispatch(setIsLoading(false));
    };

    //fetch user profile by ID
    const fetchUserProfile = async () => {
        try {
            const {
                result: { user },
            } = await axiosInstance(`user/profile/${params.userId}`);
            setisMyProfile(false);
            setUserProfileData({
                pic: user?.avatar?.url,
                username: user?.username,
                fullName: user?.fullName,
                posts: user?.post?.reverse(),
                followers: user?.followers,
                followings: user?.followings,
                bio: user?.bio,
                userId: user._id,
            });
        } catch (error) {
            console.log(error);
        }
    };
    //fetch post data by ID
    useEffect(() => {
        params?.userId
            ? fetchUserProfile()
            : setUserProfileData({
                  pic: userProfile?.avatar?.url,
                  username: userProfile?.username,
                  fullName: userProfile?.fullName,
                  posts: userProfile?.post,
                  followers: userProfile?.followers,
                  followings: userProfile?.followings,
                  bio: userProfile?.bio,
                  savedPost: userProfile?.savedPost,
              });
        setisMyProfile(true);
    }, [userProfile, params]);

    //followUnfollowHandler
    const followUnfollowHandler = async () => {
        setIsFollowed(!isFollowed);
        await dispatch(followUnfollowUser({ targetUserId: params?.userId }));
        fetchUserProfile();
        dispatch(fetchProfile());
    };
    useEffect(() => {
        userProfileData?.followers?.forEach((user) => {
            if (user?._id === userProfile?._id) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        });
    }, [userProfile?._id, userProfileData?.followers]);

    return (
        <main className="profile-main flex flex-column">
            <div className="profile-container flex flex-column">
                <div className="top-section flex">
                    <div className="profile-details-container flex">
                        <div className="profile-img">
                            <img src={userProfileData?.pic} alt="userProfile" />
                        </div>
                        <div className="profile-details flex flex-column">
                            <div className="profile-name-edit-btn flex">
                                <h5>{userProfileData?.username}</h5>

                                {isMyProfile ? (
                                    <div className="edit-btn">
                                        <button onClick={navigateHandler}>
                                            Edit Profile
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="profile-follow-btn"
                                        onClick={followUnfollowHandler}
                                    >
                                        <button
                                            className={
                                                isFollowed
                                                    ? "unfollowBtn"
                                                    : "followBtn"
                                            }
                                        >
                                            {isFollowed ? "Unfollow" : "Follow"}
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="followers-followings-post-count flex">
                                <div className="post">
                                    <span>
                                        <span>
                                            {userProfileData?.posts?.length}
                                        </span>
                                        &nbsp;Posts
                                    </span>
                                </div>
                                <div className="follower">
                                    <span
                                        onClick={() =>
                                            setIsFollowersModelActive(true)
                                        }
                                    >
                                        <span>
                                            {userProfileData?.followers?.length}
                                        </span>
                                        &nbsp;followers
                                    </span>
                                </div>
                                <div className="following">
                                    <span
                                        onClick={() =>
                                            setIsFollowingsModelActive(true)
                                        }
                                    >
                                        <span>
                                            {
                                                userProfileData?.followings
                                                    ?.length
                                            }
                                        </span>
                                        &nbsp;followings
                                    </span>
                                </div>
                            </div>
                            {/* Followers */} {/* Followers */}{" "}
                            {/* Followers */} {/* Followers */}
                            {isFollowersModelActive && (
                                <div
                                    className="showfollowmodel-container flex"
                                    onClick={() =>
                                        setIsFollowersModelActive(false)
                                    }
                                >
                                    <div className="follow-model-wrapper">
                                        <div className="follow-model-header flex">
                                            <h5>Followers</h5>
                                            <button
                                                onClick={() =>
                                                    setIsFollowersModelActive(
                                                        false
                                                    )
                                                }
                                            >
                                                <AiOutlineClose
                                                    fill="#ffffff"
                                                    size={25}
                                                />
                                            </button>
                                        </div>
                                        <div className="follow-model-body">
                                            {userProfileData?.followers?.map(
                                                (follower, i) => {
                                                    return (
                                                        <UserFollowCard
                                                            key={i}
                                                            userAvatar={
                                                                follower?.avatar
                                                                    ?.url
                                                            }
                                                            username={
                                                                follower?.username
                                                            }
                                                            fullName={
                                                                follower?.fullName
                                                            }
                                                            _id={follower?._id}
                                                            close={
                                                                setIsFollowersModelActive
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Followings */} {/* Followings */}
                            {/* Followings */}
                            {/* Followings */}
                            {isFollowingsModelActive && (
                                <div
                                    className="showfollowmodel-container flex"
                                    onClick={() =>
                                        setIsFollowingsModelActive(false)
                                    }
                                >
                                    <div className="follow-model-wrapper">
                                        <div className="follow-model-header flex">
                                            <h5>Followings</h5>
                                            <button
                                                onClick={() =>
                                                    setIsFollowingsModelActive(
                                                        false
                                                    )
                                                }
                                            >
                                                <AiOutlineClose
                                                    fill="#ffffff"
                                                    size={25}
                                                />
                                            </button>
                                        </div>
                                        <div className="follow-model-body">
                                            {userProfileData?.followings?.map(
                                                (following, i) => {
                                                    return (
                                                        <UserFollowCard
                                                            key={i}
                                                            userAvatar={
                                                                following
                                                                    ?.avatar
                                                                    ?.url
                                                            }
                                                            username={
                                                                following?.username
                                                            }
                                                            fullName={
                                                                following?.fullName
                                                            }
                                                            _id={following?._id}
                                                            close={
                                                                setIsFollowingsModelActive
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Followings */} {/* Followings */}
                            {/* Followings */}
                            {/* Followings */}
                            <div className="profile-name-bio">
                                <h4>{userProfileData?.fullName}</h4>
                                <p>{userProfileData?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-section">
                    <div className="navigation flex">
                        <button
                            className={`flex ${
                                isPostActive ? "active-section" : ""
                            }`}
                            onClick={activeHandler}
                        >
                            <BsGrid3X3 size={15} color={"#fff"} /> Post
                        </button>
                        {isMyProfile && (
                            <button
                                className={`flex ${
                                    isSavedActive ? "active-section" : ""
                                }`}
                                onClick={activeHandler}
                            >
                                <HiOutlineBookmark size={15} color={"#fff"} />{" "}
                                Saved
                            </button>
                        )}
                    </div>
                    <section className="post-section">
                        <div className="inner-post-section flex flex-column">
                            {isPostActive ? (
                                <>
                                    {userProfileData?.posts?.length !== 0 ? (
                                        <div className="user-post">
                                            {userProfileData?.posts?.map(
                                                ({ image: { url }, _id }) => {
                                                    return (
                                                        <Link
                                                            key={_id}
                                                            to={`/post/${_id}`}
                                                            onClick={() =>
                                                                dispatch(
                                                                    setIsSinglePostModel(
                                                                        true
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <div className="userSinglePost">
                                                                <img
                                                                    src={url}
                                                                    alt={_id}
                                                                />
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            {isMyProfile ? (
                                                <>
                                                    {" "}
                                                    <button className="camera-icon">
                                                        <SlCamera
                                                            color="#222222"
                                                            size={40}
                                                        />
                                                    </button>
                                                    <div className="share-text text-center">
                                                        <h3>Share photos</h3>
                                                        <p>
                                                            When you share
                                                            photos, they will
                                                            appear on your
                                                            profile.
                                                        </p>
                                                    </div>
                                                    <div className="share-btn">
                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    setIsUploadModel(
                                                                        true
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Share your first
                                                            photo
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <h1>Their is no posts...</h1>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {userProfileData?.savedPost?.length !==
                                    0 ? (
                                        <div className="user-post">
                                            {userProfileData?.savedPost?.map(
                                                ({ image: { url }, _id }) => {
                                                    return (
                                                        <Link
                                                            key={_id}
                                                            to={`/post/${_id}`}
                                                            onClick={() =>
                                                                dispatch(
                                                                    setIsSinglePostModel(
                                                                        true
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <div className="userSinglePost">
                                                                <img
                                                                    src={url}
                                                                    alt={_id}
                                                                />
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            <button className="camera-icon">
                                                <SlCamera
                                                    color="#222222"
                                                    size={40}
                                                />
                                            </button>
                                            <div className="share-text text-center">
                                                <h3>Share photos</h3>
                                                <p>
                                                    When you share photos, they
                                                    will appear on your profile.
                                                </p>
                                            </div>
                                            <div className="share-btn">
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            setIsUploadModel(
                                                                true
                                                            )
                                                        )
                                                    }
                                                >
                                                    Share your first photo
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default Profile;
