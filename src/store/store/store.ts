import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import logger from "redux-logger";

import userReducer from './slice/user-slice';
import changeReducer from './slice/change-taskSlice'
import saveUserData from "./saveUserData";
import getUserData from "./getUserData";

const preloadedState: Record<string, any> =
    getUserData();


const store = configureStore({
    reducer: {
        user: userReducer,
        tasklist: changeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveUserData, logger, thunk),
    preloadedState: preloadedState,

});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



