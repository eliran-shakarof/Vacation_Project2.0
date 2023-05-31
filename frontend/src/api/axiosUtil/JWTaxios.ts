import axios from 'axios'
import { StatusCodes } from 'http-status-codes'

const JWTaxios = axios.create({
    headers: {
      Accept: 
      'application/json',
      'Content-Type': 'application/json;'
    },
    validateStatus: status => status >= StatusCodes.OK && status < StatusCodes.BAD_REQUEST,
});


JWTaxios.interceptors.request.use(request =>{
    request.headers = {
        "Authorization" : localStorage.getItem("userToken"),
        'Content-Type': 'multipart/form-data'
    }
    return request;
})

export default JWTaxios;