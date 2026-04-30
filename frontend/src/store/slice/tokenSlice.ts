import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
    accessToken: string | null;
}

const initialState: TokenState = {
    accessToken: null,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearToken: (state) => {
            state.accessToken = null;
        },
    },
});

export const { setAccessToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;