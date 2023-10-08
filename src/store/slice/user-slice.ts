import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    email: string | null;
}

export interface LoginFormPayload {
    error?: string;
    email: string;
}

const initialUserState: UserState = { email: null }

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login(state, action: PayloadAction<LoginFormPayload>) {
            if (action.payload?.error) {
                state.email = null;
            } else {
                state.email = action.payload.email;
            }
        },
        signup(state, action: PayloadAction<LoginFormPayload>) {
            if (action.payload?.error) {
                state.email = null;
            } else {
                state.email = action.payload.email;
            }
        },

        logout(state) {
            state.email = null;
        },
        getSavedUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email;
        },
    }
})
export const userActions = userSlice.actions
export default userSlice.reducer