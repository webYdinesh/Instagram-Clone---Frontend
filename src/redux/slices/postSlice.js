import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Utils/AxiosClient";
import { setIsLoading } from "./appConfigSlice";

//to fetch all post
export const fetchAllPost = createAsyncThunk(
    "post/all",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const {
                result: { posts },
            } = await axiosInstance.get("post/all");
            return posts;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
//to dispatch like and dislike
export const fetchPostLikedUser = createAsyncThunk(
    "/likedislikepost",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post(
                "post/likedislikepost",
                body
            );
            return result;
        } catch (error) {
            return Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);

//to comment on post
export const postComment = createAsyncThunk(
    "/comment",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post("post/comment", body);
            return result;
        } catch (error) {
            Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
//to delete post
export const deletePost = createAsyncThunk(
    "/deletepost",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post(
                "post/deletepost",
                body
            );
            return result;
        } catch (error) {
            Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
//to bookmark post
export const bookmarkPost = createAsyncThunk(
    "/savedpost",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post("user/savedpost", body);

            return result;
        } catch (error) {
            Promise.reject(error);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
const postSlice = createSlice({
    name: "post",
    initialState: {
        allPost: null,
        likedUser: null,
        optionModel: false,
        deletePost: "",
    },
    reducers: {
        setOptionModel: (state, action) => {
            state.optionModel = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPost.fulfilled, (state, action) => {
                state.allPost = action.payload;
            })
            .addCase(fetchPostLikedUser.fulfilled, (state, action) => {
                state.likedUser = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.deletePost = action.payload;
            });
    },
});

export default postSlice.reducer;
export const { setOptionModel } = postSlice.actions;
