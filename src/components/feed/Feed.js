import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchAllPost } from "../../redux/slices/postSlice";
import Avatar from "../avatar/Avatar";
import FollowSuggestion from "../follow-suggestions/FollowSuggestion";
import SinglePost from "../single-post/SinglePost";
import "./feed.scss";
const Feed = () => {
    const posts = useSelector((state) => state.postReducer.allPost);
    const user = useSelector((state) => state.appConfigReducer.userProfile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllPost());
    }, []);

    return (
        <section className="feed-section flex">
            <div className="feed-container">
                <section className="status-section">
                    <div className="status-container flex">
                        {user?.followings?.map((following, i) => {
                            return <Avatar key={i} following={following} />;
                        })}
                    </div>
                </section>
                <section className="posts-section">
                    <div className="post-container flex flex-column">
                        {posts?.map((post, i) => {
                            return <SinglePost key={i} postDetails={post} />;
                        })}
                    </div>
                </section>
            </div>
            <section className="suggestion">
                <FollowSuggestion />
            </section>
            <Outlet />
        </section>
    );
};

export default Feed;
