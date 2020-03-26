// @ts-ignore

import {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import {axios, UtilsAxios} from "../utils/utilsAxios";


export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get('http://localhost:3100/users/');
    }
};
