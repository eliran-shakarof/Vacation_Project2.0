import axios from 'axios'
//import Urls from '../Utils/Urls'
import { StatusCodes } from 'http-status-codes'

const JWTaxios = axios.create({
  //  baseURL: Urls.serverUrl,
    headers: {
      Accept: 
      'application/json',
      'Content-Type': 'application/json; multipart/form-data '
    },
    validateStatus: status => status >= StatusCodes.OK && status < StatusCodes.BAD_REQUEST,
});


JWTaxios.interceptors.request.use(request =>{
    request.headers = {
        "Authorization" : localStorage.getItem("userToken")
    }
    return request;
})

export default JWTaxios;