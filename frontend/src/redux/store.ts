import { combineReducers } from "redux";
import { userReducer } from "./userState";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from "./auth-slice";
import { userReducerNew } from "./user-slice";
import { vacationsReducer } from "./vacation-slice";
import { FollowingReducer } from "./following-slice";


const reducers = combineReducers({ userState: userReducer });
//export const store = configureStore({ reducer: reducers });

export const store = configureStore({ 
    reducer:{
        auth: authReducer,
        userState: userReducer,
        user: userReducerNew,
        vacationsList: vacationsReducer,
        followingList: FollowingReducer,
    }
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector