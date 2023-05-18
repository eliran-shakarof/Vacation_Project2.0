import { createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
import { RootState } from "./store";

//create our user types
export enum userRole {
    "User",
    "Admin",
    "Guest",
}

export interface UserState {
    firstName: string;
    userName: string;
    userRole: userRole;
    userToken: string|null;
}

const initialState: UserState = {
    firstName: "",
    userName: "",
    userRole: userRole.Guest,
    userToken: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      userLogin: (state,action:any) => {
        let decodePayload:any = decodeToken(action.payload);
        state.firstName = decodePayload.user.first_name.charAt(0).toUpperCase()+decodePayload.user.first_name.slice(1);
        state.userName = decodePayload.user.user_name;
        state.userRole = decodePayload.user.role;
        state.userToken = action.payload;
        localStorage.setItem("userToken",action.payload);
      },

      userLogout: state =>{
        state.firstName = "";
        state.userName = "Guest";
        state.userRole = userRole.Guest;
        state.userToken = null;
        localStorage.removeItem("userToken");
      },

      updateToken: (state,action) =>{
        state.userToken = action.payload.userToken;
      },

    },
})

export const selectUserState = (state: RootState) => state.user;
export const { userLogin, userLogout, updateToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
