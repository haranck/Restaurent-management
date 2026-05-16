import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types";

interface AuthState {
    user: AuthUser | null
}
const initialState: AuthState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<AuthUser>) {
            state.user = action.payload;
        },
        clearAuth(state) {
            state.user = null
        }
    }
})

export const { setAuthUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;