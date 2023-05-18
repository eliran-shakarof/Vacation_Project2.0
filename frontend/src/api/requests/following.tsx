import { Following } from "../../Models/following";
import JWTaxios from "../axiosUtil/JWTaxios";

const getAllFollowingFor = async (userName: string): Promise<any> =>{
    const axiosResponse = await JWTaxios.get(`/following/all_for/${userName}`)
    return axiosResponse.data;
}

const addNewFollow = async (newFollow: Following): Promise<any> =>{
    const axiosResponse = await JWTaxios.post(`/following/add`,newFollow)
    return axiosResponse.data;
}

const deleteFollow = async (follow: Following): Promise<any> =>{
    const axiosResponse = await JWTaxios.delete(`/following/delete/${follow.user_name}&${follow.vacation_id}`)
    return axiosResponse.data;
}


export const followingApiRequest = {
    getAllFollowingFor,
    addNewFollow,
    deleteFollow
}