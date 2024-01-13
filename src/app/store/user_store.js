import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user_slice.js';

export const store = configureStore({
    reducer: {
        user: userSlice
    }
});