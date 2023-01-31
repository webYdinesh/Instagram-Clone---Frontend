import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoading } from "../../redux/slices/appConfigSlice";
import { axiosInstance } from "../../Utils/AxiosClient";
import "./searchmodel.scss";
const SearchModel = ({ close }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [isUserSearched, setIsUserSearched] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchHandler = async () => {
        try {
            dispatch(setIsLoading(true));

            setIsUserSearched(true);
            const {
                result: { user },
            } = await axiosInstance.post("/user/searchbyquery", {
                searchQuery: searchValue,
            });
            setSearchResults(user);
        } catch (error) {
            Promise.reject(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };
    const navigateProfile = (userId) => {
        document.title = "Instagram";
        close(false);
        navigate(`user/${userId}`);
    };
    return (
        <div className="search-model-container flex">
            <div className="search-wrapper">
                <div className="serach-header">
                    <h2>Search</h2>
                    <div className="search-input">
                        <label htmlFor="search">
                            <BiSearch color={"#414141"} size={30} />
                        </label>

                        <input
                            type="text"
                            name="searchquery"
                            id="search"
                            placeholder="Search"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                            <button onClick={searchHandler}>
                                <BiSearch size={25} color={"#fff"} />
                            </button>
                        )}
                    </div>
                </div>
                <div
                    className={
                        searchResults?.length > 0
                            ? "search-body"
                            : "search-body flex"
                    }
                >
                    {!isUserSearched ? (
                        <span>No searches there.</span>
                    ) : (
                        <>
                            {searchResults?.length > 0 ? (
                                <>
                                    {searchResults?.map((user) => {
                                        return (
                                            <div
                                                key={user._id}
                                                className="search-result-container suggestion-user-profile flex"
                                                onClick={() =>
                                                    navigateProfile(user._id)
                                                }
                                            >
                                                <div className="image-text-wrapper flex ">
                                                    <Link
                                                        to={`/user/${user._id}`}
                                                    >
                                                        <div className="profile-image">
                                                            <img
                                                                src={
                                                                    user.avatar
                                                                        .url
                                                                }
                                                                alt="profilepic"
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="text">
                                                        <Link
                                                            to={`/user/${user._id}`}
                                                        >
                                                            <h6>
                                                                {user.username}
                                                            </h6>
                                                        </Link>
                                                        <span>
                                                            {user.fullName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <span>No result found.</span>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="close-btn">
                <button
                    onClick={() => {
                        document.title = "Instagram";
                        close(false);
                    }}
                >
                    <AiOutlineClose fill="#ffffff" size={40} />
                </button>
            </div>
        </div>
    );
};

export default SearchModel;
