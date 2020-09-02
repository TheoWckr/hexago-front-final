// @ts-ignore

import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";
import {UserModel} from "../models/userModel";

const routeName = MAIN_ADRESS+'users/';
export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get('http://localhost:3100/users/');
    },

    /** Crée un joueur */
    createUser(user : any) : AxiosPromise {
        let userRequest = new UserModel(user);
        userRequest._id = undefined;
        return axios.post(routeName + 'signup', userRequest);
    },
};
