import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Utils/AxiosClient";
import { setIsLoading } from "./appConfigSlice";
export const fetchAllUsers = createAsyncThunk(
    "user/alluser",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const {
                result: { users },
            } = await axiosInstance.get("/user/alluser");
            return users;
        } catch (error) {
            Promise.reject(error.message);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
export const followUnfollowUser = createAsyncThunk(
    "user/followunfollowuser",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { message } = await axiosInstance.post(
                "/user/followunfollow",
                body
            );
            toast.success(message, {
                position: "top-center",
                theme: "dark",
                autoClose: 4000,
            });
            return;
        } catch (error) {
            Promise.reject(error.message);
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: null,
    },
    reducers: {
        setIsFollowed: (state, action) => {
            state.isFollowed = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    },
});

export default userSlice.reducer;
export const { setIsFollowed } = userSlice.actions;
