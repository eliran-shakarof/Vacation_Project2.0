import { Vacation } from "../../Models/vacation";
import axios from "axios";
import JWTaxios from "../axiosUtil/JWTaxios";

const getAllVacations = async (): Promise<any> =>{
    const axiosResponse = await axios.get(`/vacations/all`);
    return axiosResponse.data;
}

const addNewVacation = async (newVacation: Vacation): Promise<any> =>{
    console.log(newVacation);
    const axiosResponse = await JWTaxios.post(`/vacations/add`,newVacation);
    return axiosResponse.data;
}

const editVacation = async (vacation: Vacation): Promise<any> =>{
    const axiosResponse = await JWTaxios.put(`/vacations/update/${vacation.vacation_id}`, vacation);
    return axiosResponse.data;
}

const deleteVacation = async (cardId: number,imageName: string): Promise<any> =>{
    const axiosResponse = await JWTaxios.post(`/vacations/delete/${cardId}`,{imageName});
    return axiosResponse.data;
}

export const vacationApiRequest = {
    getAllVacations,
    addNewVacation,
    editVacation,
    deleteVacation
}