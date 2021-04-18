// @ts-ignore

import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios, UtilsAxios} from "../utils/utilsAxios";
import {UserModel} from "../models/userModel";
import {LoginFormType} from "../models/form/loginFormType";
import {RegisterFormType} from "../models/form/registerFormType";
import {UserUpdateData} from "../models/service/userServiceType";



const routeName = MAIN_ADRESS+'users/';
export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get(routeName);
        },

    signup(registerData : RegisterFormType): AxiosPromise{
        return axios.post(  routeName+'signup', registerData)    },
    /**
     * For login
     * @param loginData
     * @return data.token the JWT Token of the session
     */
    login(loginData: LoginFormType): AxiosPromise{
        return axios.post(routeName + 'login', loginData)    },
    /**
     * Fonction that take the user's token and return all data about it
     * not usable on other users
     * @param token
     */
    me(token : String): AxiosPromise{
        const header = {
            headers : {
                token: token
            }
        };
        return axios.get(routeName + 'me', header);
        },

    /** Crée un joueur */
    createUser(user: any) : AxiosPromise {
        let userRequest = new UserModel(user);
        userRequest._id = undefined;
        return axios.post(routeName + 'signup', userRequest);
    },
    updateUser(user:UserUpdateData) : AxiosPromise{
        const header = {
            headers : {
                token: localStorage.getItem('token'),

            'Content-Type':'application/x-www-form-urlencoded'

            }
        };
        return axios.patch(routeName + 'update/',user,header);
    }
};
