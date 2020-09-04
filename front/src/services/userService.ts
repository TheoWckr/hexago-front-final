// @ts-ignore

import {AxiosPromise} from "axios";
import {axios} from "../utils/utilsAxios";
import {LoginFormType} from "../models/form/loginFormType";
import {RegisterFormType} from "../models/form/registerFormType";

const empyUserProfil = {
    "userProfile":{
    "experience":0,
        "grade":0,
        "rank":0,
        "friendList": [],
        "blackList": [],
        "favoriteGames": [],
        "favoriteGenres": []
}
};


export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get('http://localhost:3100/users/');
    },

    signup(registerData : RegisterFormType): AxiosPromise{
        return axios.post('http://localhost:3100/users/signup', registerData)
    },
    /**
     * For login
     * @param loginData
     * @return data.token the JWT Token of the session
     */
    login(loginData: LoginFormType): AxiosPromise{
        return axios.post('http://localhost:3100/users/login', loginData)
    },
    /**
     * Fonction that take the user's token and return all data about it
     * not usable on other users
     * @param token
     */
    me(token : String): AxiosPromise{
        const header = {
            header : {
                token: 'token'
            }
        };
        return axios.get('http://localhost:3100/users/me', header);
    },

};
