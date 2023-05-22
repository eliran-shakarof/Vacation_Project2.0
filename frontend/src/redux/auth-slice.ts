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
    status: RequestStatus
}

const initialState: AuthState = {
    status: RequestStatus.Idle,
}

export const loginAsync = createAsyncThunk('auth/login', async (userCred:WithCallback<UserCredentials, string>, { dispatch, getState }) => {
    try{
      const response = await authRequests.login(userCred);
      dispatch(userLogin(response.headers.authorization)); 
      
      const state = getState() as RootState;
      userCred.successCallback?.(state.user.firstName);
      
      dispatch(vacationsListAsync());
      if(state.user.userRole === userRole.User){
        dispatch(getFollowListAsync(state.user.userName));
      }
      
    }catch(err:any){
       notify.error(`${err.response.data}`);
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

export const relogAsync = createAsyncThunk('auth/relog', async (user:WithCallback<{}>, { dispatch }) => {
    try{
      const response = await authRequests.relog();
      dispatch(userLogin(response.headers.authorization)); 
      
    }catch(err:any){
      dispatch(userLogout());
      user.failureCallback?.();
    }
  },
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  
  extraReducers: builder => {
    builder
      .addCase(loginAsync.pending, state => {
        state.status = RequestStatus.Loading
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message
        state.status = RequestStatus.Failed
      })

  },
})


export const selectAuthState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer
