import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { RequestStatus } from "../Models/request-status";
import { authRequests } from "../api/requests/auth";
import { WithCallback } from "../Models/callback";
import { UserCredentials } from "../Models/credentials-model";
import  { userLogin, userLogout, userRole } from "./user-slice";
import notify from "../Utils/Notify";
import { User } from "../Models/user";
import { vacationsListAsync } from "./vacation-slice";
import { getFollowListAsync } from "./following-slice";

export interface AuthState {
    error?: string
    status: RequestStatus,
    googleStatus: RequestStatus
}

const initialState: AuthState = {
    status: RequestStatus.Loading,
    googleStatus: RequestStatus.Idle
}

export const googleLoginAsync = createAsyncThunk('auth/googleLogin', async (token:WithCallback<any ,string>, { dispatch, getState }) => {
    try{
      const response = await authRequests.googleLogin(token);
      console.log(response.headers.authorization);
      dispatch(userLogin(response.headers.authorization)); 
      
      const state = getState() as RootState;
      token.successCallback?.(state.user.firstName);

      //If I logged with user i make request for follow list
      if(state.user.userRole === userRole.User){
        dispatch(getFollowListAsync(state.user.userName));
      }
    }catch(err:any){
       notify.error(`${err.response.data}`);
    }
  },
)
    


export const loginAsync = createAsyncThunk('auth/login', async (userCred:WithCallback<UserCredentials, string>, { dispatch, getState }) => {
    try{
      const response = await authRequests.login(userCred);
      dispatch(userLogin(response.headers.authorization)); 
      
      const state = getState() as RootState;
      userCred.successCallback?.(state.user.firstName);
      
      //If I logged with user i already make request for follow list
      if(state.user.userRole === userRole.User){
        dispatch(getFollowListAsync(state.user.userName));
      }
    }catch(err:any){
       notify.error(`${err.response.data}`);
    }
  },
)

export const relogAsync = createAsyncThunk('auth/relog', async (user:WithCallback<{}>, { dispatch, getState }) => {
    dispatch(vacationsListAsync());//request for vacation list when the application up

    //checking if there is user that logged before
    if(localStorage.getItem("userToken")){ 
      try{
        const response = await authRequests.relog();
        dispatch(userLogin(response.headers.authorization)); 
        const state = getState() as RootState;

        //If I logged with user i already make request for follow list
        if(state.user.userRole === userRole.User){
          dispatch(getFollowListAsync(state.user.userName));
        }
      }catch(err:any){
        dispatch(userLogout());
        user.failureCallback?.();
      }
    }else{
      const state = getState() as RootState;
      state.auth.status = RequestStatus.Idle;
    }
  },
)

export const registerAsync = createAsyncThunk('auth/register', async (newUser:WithCallback<User, string>, { dispatch, getState }) => {
    try{
      const response = await authRequests.register(newUser);

      dispatch(userLogin(response.headers.authorization)); 
      const state = getState() as RootState;
      newUser.successCallback?.(state.user.firstName);
      
    }catch(err:any){
      notify.error(`${err.response.data}`);
    }
  },
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  
  extraReducers: builder => {
    builder
      .addCase(relogAsync.pending, state => {
        state.status = RequestStatus.Loading
      })
      .addCase(relogAsync.fulfilled, (state, action) => {
        state.status = RequestStatus.Idle
        
      })
      .addCase(relogAsync.rejected, (state, action) => {
        state.error = action.error.message
        state.status = RequestStatus.Failed
      })
      .addCase(googleLoginAsync.pending, state => {
        state.status = RequestStatus.Loading
      })
      .addCase(googleLoginAsync.fulfilled, (state, action) => {
        state.status = RequestStatus.Idle
        
      })
      .addCase(googleLoginAsync.rejected, (state, action) => {
        state.error = action.error.message
        state.status = RequestStatus.Failed
      })
     
  },
})


export const selectAuthState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer
