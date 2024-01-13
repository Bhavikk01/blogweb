import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        getUserDetails: (state, action) => {
            state.user = action.payload
        },
    }
});

export const { getUserDetails } = userSlice.actions;
export default userSlice.reducer;