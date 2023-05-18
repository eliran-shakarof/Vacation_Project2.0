import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../Models/request-status";
import { followingApiRequest } from "../api/requests/following";
import notify from "../Utils/Notify";
import { RootState } from "./store";
import { Vacation } from '../Models/vacation';
import { Following } from "../Models/following";
import { WithCallback } from "../Models/callback";
import { decreaseVacationFollow, increaseVacationFollow } from "./vacation-slice";

export interface followingState {
    followingList: Vacation[]
    error?: string
    status: RequestStatus
}

const initialState: followingState = {
    followingList: [],
    status: RequestStatus.Idle,
    error: undefined,   
}

export const getFollowListAsync = createAsyncThunk('following/all_for', async (userName:string) => {
    try{
        const response = await followingApiRequest.getAllFollowingFor(userName);
        return response;
    }catch(err:any){
        notify.error(`${err.response.data}`);
    }
})

export const addNewFollowAsync = createAsyncThunk('following/add', async (newFollow:WithCallback<Following>, { dispatch }) => {
    try{
        const response = await followingApiRequest.addNewFollow(newFollow);
        dispatch(increaseVacationFollow({vacation_id: newFollow.vacation_id}));
        return response;
    }catch(err:any){
        notify.error(`${err.response.data}`);    
        newFollow.failureCallback?.();
    }
})

export const deleteFollowAsync = createAsyncThunk('following/delete', async (follow:WithCallback<Following>, { dispatch }) => {
    try{
        await followingApiRequest.deleteFollow(follow);
        dispatch(decreaseVacationFollow({vacation_id: follow.vacation_id}));
        return follow;
    }catch(err:any){
        notify.error(`${err.response.data}`);
        follow.failureCallback?.();
    }
})


export const followingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder
        .addCase(getFollowListAsync.pending, state => {
            state.status = RequestStatus.Loading
        })
        .addCase(getFollowListAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.Idle
            state.followingList = action.payload
        })
        .addCase(getFollowListAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.status = RequestStatus.Failed
        })
        .addCase(addNewFollowAsync.pending, state => {
            state.status = RequestStatus.Loading
        })
        .addCase(addNewFollowAsync.fulfilled, (state, action) => {
            console.log(action);
            state.status = RequestStatus.Idle
            state.followingList = [...state.followingList,action.payload];
        })
        .addCase(addNewFollowAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.status = RequestStatus.Failed
        })
        .addCase(deleteFollowAsync.pending, state => {
            state.status = RequestStatus.Loading
        })
        .addCase(deleteFollowAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.Idle
            state.followingList = state.followingList.filter((vacation)=> vacation.vacation_id !== action.payload?.vacation_id);
        })
        .addCase(deleteFollowAsync.rejected, (state, action) => {
            state.error = action.error.message
            state.status = RequestStatus.Failed
        })
    },
})


export const selectFollowingState = (state: RootState) => state.followingList;
export const FollowingReducer = followingSlice.reducer
