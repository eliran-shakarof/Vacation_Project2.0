import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vacation } from "../Models/vacation";
import { RequestStatus } from "../Models/request-status";
import { vacationApiRequest } from "../api/requests/vacation";
import notify from "../Utils/Notify";
import { RootState } from "./store";
import { WithCallback } from "../Models/callback";

export interface VacationsState {
    vacationsList: Vacation[]
    error?: string
    status: RequestStatus
}

const initialState: VacationsState = {
    vacationsList: [],
    status: RequestStatus.Idle,
    error: undefined,   
}

export const vacationsListAsync = createAsyncThunk('vacations/all', async () => {
    try{
        const response = await vacationApiRequest.getAllVacations();
        return response
    }catch(err:any){
        notify.error(`${err.response.data}`);
    }
  })

export const addNewVacationAsync = createAsyncThunk('vacations/add', async (newVacation: WithCallback<Vacation>, { dispatch }) => {
    try{
        const response = await vacationApiRequest.addNewVacation(newVacation);
        newVacation.successCallback?.();
        return response
    }catch(err:any){
        notify.error(`${err.response.data}`);
    }
  })



  export const vacationsSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {
      increaseVacationFollow: (state,action) => {
          let index = state.vacationsList.findIndex(item => item.vacation_id === action.payload.vacation_id);
          state.vacationsList[index].sumFollowers += 1;
      },
      decreaseVacationFollow: (state,action) => {
        let index = state.vacationsList.findIndex(item => item.vacation_id === action.payload.vacation_id);
        console.log(index +"!!!")
        state.vacationsList[index].sumFollowers -= 1;
     },
    },
    
    extraReducers: builder => {
      builder
        .addCase(vacationsListAsync.pending, state => {
          state.status = RequestStatus.Loading
        })
        .addCase(vacationsListAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.Idle
            state.vacationsList = action.payload
        })
        .addCase(vacationsListAsync.rejected, (state, action) => {
          state.error = action.error.message
          state.status = RequestStatus.Failed
        })
        .addCase(addNewVacationAsync.pending, state => {
          state.status = RequestStatus.Loading
        })
        .addCase(addNewVacationAsync.fulfilled, (state, action) => {
            state.status = RequestStatus.Idle
            state.vacationsList.push(action.payload);
        })
        .addCase(addNewVacationAsync.rejected, (state, action) => {
          state.error = action.error.message
          state.status = RequestStatus.Failed
        })
    },
  })

  
export const selectVacationsState = (state: RootState) => state.vacationsList;
export const { increaseVacationFollow, decreaseVacationFollow } = vacationsSlice.actions;
export const vacationsReducer = vacationsSlice.reducer
