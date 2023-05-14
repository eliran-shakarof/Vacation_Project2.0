import { Vacation } from "../../Models/vacation";
import axios from "axios";

const getAllVacations = async (): Promise<any> =>{
    const axiosResponse = await axios.get(`/vacations/all`);
    return axiosResponse.data;
}


export const vacationApiRequest = {
    getAllVacations,
}