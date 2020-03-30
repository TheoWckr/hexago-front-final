// @ts-ignore

import {AxiosPromise} from "axios";
import {axios} from "../utils/utilsAxios";


export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get('http://localhost:3100/users/');
    }
};
