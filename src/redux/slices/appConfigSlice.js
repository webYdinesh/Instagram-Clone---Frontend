import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Utils/AxiosClient";
export const fetchProfile = createAsyncThunk(
    "profile/me",
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const {
                result: { user },
            } = await axiosInstance("user/profile/me");
            return user;
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                theme: "dark",
                autoClose: 4000,
            });
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
export const updateProfile = createAsyncThunk(
    "/updateprofile",
    async (body, thunkAPI) => {
        try {
            thunkAPI.dispatch(setIsLoading(true));
            const { result: user } = await axiosInstance.put(
                "user/updateprofile",
                body
            );
            return user;
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                theme: "dark",
                autoClose: 4000,
            });
        } finally {
            thunkAPI.dispatch(setIsLoading(false));
        }
    }
);
export const logoutUser = createAsyncThunk("/logout", async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setIsLoading(true));
        const response = await axiosInstance.get("auth/logout");
        toast.success(response.message, {
            position: "top-center",
            theme: "dark",
            autoClose: 4000,
        });
        return;
    } catch (error) {
        toast.error(error.message, {
            position: "top-center",
            theme: "dark",
            autoClose: 4000,
        });
    } finally {
        thunkAPI.dispatch(setIsLoading(false));
    }
});

const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: {
        isLoading: false,
        userProfile: null,
        isUploadModel: false,
        isSinglePostModel: false,
        isReelUploadModel: false,
    },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsUploadModel: (state, action) => {
            state.isUploadModel = action.payload;
        },
        setIsSinglePostModel: (state, action) => {
            state.isSinglePostModel = action.payload;
        },
        setIsReelUploadModel: (state, action) => {
            state.isReelUploadModel = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload.user;
        });
    },
});

export default appConfigSlice.reducer;
export const {
    setIsLoading,
    setIsReelUploadModel,
    setIsSinglePostModel,
    setIsUploadModel,
} = appConfigSlice.actions;
