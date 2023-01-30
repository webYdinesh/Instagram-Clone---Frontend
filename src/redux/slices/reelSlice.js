import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Utils/AxiosClient";
import { setIsLoading } from "./appConfigSlice";

//to upload reel
export const createReel = createAsyncThunk(
    "/reel/create",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post("/reel/create", body);
            toast.success("posted successfully", {
                position: "top-center",
                theme: "dark",
                autoClose: 4000,
            });
            return result;
        } catch (e) {
            Promise.reject(e.messsage);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);

//to get all reels
export const fetchAllReels = createAsyncThunk(
    "/reel/allreels",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const {
                result: { reels },
            } = await axiosInstance.post("/reel/allreels");

            return reels;
        } catch (e) {
            Promise.reject(e.messsage);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);

//to dispatch like and dislike on reel
export const fetchReelLikedUser = createAsyncThunk(
    "/likedislikereel",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post(
                "reel/likedislikereel",
                body
            );
            return result;
        } catch (error) {
            Promise.reject(error.message);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);

//to comment on reel
export const postCommentOnReel = createAsyncThunk(
    "/commentreel",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result } = await axiosInstance.post(
                "reel/commentreel",
                body
            );
            return result;
        } catch (error) {
            Promise.reject(error.message);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
const reelSlice = createSlice({
    name: "reel",
    initialState: {
        allReels: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllReels.fulfilled, (state, action) => {
            state.allReels = action.payload;
        });
    },
});

export default reelSlice.reducer;
