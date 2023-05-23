import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vacation } from "../Models/vacation";
import { RequestStatus } from "../Models/request-status";
import { vacationApiRequest } from "../api/requests/vacation";
import notify from "../Utils/Notify";
import { RootState } from "./store";
import { WithCallback } from "../Models/callback";

export interface deleteVacation {
    vacation_id: number;
    imageName: string;
}

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

export const addNewVacationAsync = createAsyncThunk('vacations/add', async (newVacation: WithCallback<Vacation>) => {
    try{
        const response = await vacationApiRequest.addNewVacation(newVacation);
        newVacation.successCallback?.();
        return response
    }catch(err:any){
        notify.error(`${err.response.data}`);
    }
  })

  export const editVacationAsync = createAsyncThunk('vacations/edit', async (vacation: WithCallback<Vacation>) => {
    try{
        const response = await vacationApiRequest.editVacation(vacation);
        vacation.successCallback?.();
        return response
    }catch(err:any){
        notify.error(`${err.response.data}`);
    }
  })

  export const deleteVacationAsync = createAsyncThunk('vacations/delete', async (deleteVacation: deleteVacation) => {
    try{
        await vacationApiRequest.deleteVacation(deleteVacation.vacation_id,deleteVacation.imageName);
        return deleteVacation.vacation_id;
    }catch(err:any){
        console.log(err);
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
            state.vacationsList = [...state.vacationsList,action.payload];
        })
        .addCase(addNewVacationAsync.rejected, (state, action) => {
          state.error = action.error.message
          state.status = RequestStatus.Failed
        })
        .addCase(editVacationAsync.pending, state => {
          state.status = RequestStatus.Loading
        })
        .addCase(editVacationAsync.fulfilled, (state, action:any) => {
            state.status = RequestStatus.Idle
            ///////////payload -> hand updated vacation
            state.vacationsList.map(vacation => {
              if(vacation.vacation_id === action.payload.vacation_id){
                vacation.description = action.payload.description;
                vacation.destination = action.payload.destination;
                vacation.price = action.payload.price;
                vacation.imageName = action.payload.imageName;
                vacation.start_date = action.payload.start_date;
                vacation.end_date = action.payload.end_date;
              }
            })
        })
        .addCase(editVacationAsync.rejected, (state, action) => {
          state.error = action.error.message
          state.status = RequestStatus.Failed
        })
        .addCase(deleteVacationAsync.pending, state => {
          state.status = RequestStatus.Loading
        })
        .addCase(deleteVacationAsync.fulfilled, (state, action:any) => {
            state.status = RequestStatus.Idle
            console.log(action.payload);
            state.vacationsList = state.vacationsList.filter((vacation)=> vacation.vacation_id !== action.payload);
        })
        .addCase(deleteVacationAsync.rejected, (state, action) => {
          state.error = action.error.message
          state.status = RequestStatus.Failed
        })
    },
  })

  
  
export const selectVacationsState = (state: RootState) => state.vacations;
export const { increaseVacationFollow, decreaseVacationFollow } = vacationsSlice.actions;
export const vacationsReducer = vacationsSlice.reducer
