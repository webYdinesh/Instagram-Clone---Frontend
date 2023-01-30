import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postReducer from "./slices/postSlice";
import userReducer from "./slices/userSlice";
import reelReducer from "./slices/reelSlice";
const store = configureStore({
    reducer: {
        appConfigReducer,
        postReducer,
        userReducer,
        reelReducer,
    },
});

export default store;
