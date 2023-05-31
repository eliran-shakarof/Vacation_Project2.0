import axios from 'axios'
import { UserCredentials } from '../../Models/credentials-model';
import { User } from "../../Models/user"
import JWTaxios from '../axiosUtil/JWTaxios';


const login = async (userCred: UserCredentials): Promise<any> => {
    const apiResponse = await axios.post(`/auth/login`,userCred);
    return apiResponse;
}

const register = async (newUser: User): Promise<any> => {
    const apiResponse = await axios.post(`/auth/register`, newUser);
    return apiResponse;
}

const relog = async (): Promise<any> => {
    const apiResponse = await JWTaxios.post(`/auth/relog`);
    return apiResponse;
}

const googleLogin = async (token:any): Promise<any> =>{
    const apiResponse = await JWTaxios.post("/auth/api/v1/auth/google",token);
    return apiResponse;
}

export const authRequests = {
    login,
    register,
    relog,
    googleLogin
}