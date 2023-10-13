import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";

import userReducer from '@/store/slice/user-slice';
import changeReducer from '@/store/slice/change-favorite'

import saveUserData from "./saveUserData";
import getUserData from "./getUserData";

const preloadedState: Record<string, any> =
    getUserData();

const store = configureStore({
    reducer: {
        user: userReducer,
        jobored: changeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveUserData, thunk),
    preloadedState: preloadedState,

});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



