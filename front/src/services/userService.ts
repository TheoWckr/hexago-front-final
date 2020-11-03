// @ts-ignore

import {AxiosPromise} from "axios";
import {MAIN_ADRESS, axios} from "../utils/utilsAxios";
import {UserModel} from "../models/userModel";
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

const routeName = MAIN_ADRESS+'users/';
export const UserService = {

    /** Renvois tous les users */
    getAllUser() :AxiosPromise {
        return axios.get('http://localhost:3100/users/');
    },

    signup(registerData : RegisterFormType): AxiosPromise{
        return axios.post('http://localhost:3100/users/signup', registerData)
    },
    login(loginData: LoginFormType): AxiosPromise{
        return axios.post('http://localhost:3100/users/login', loginData)
    },
    me(token : String): AxiosPromise{
        const header = {
            header : {
                token: 'token'
            }
        };
        return axios.get('http://localhost:3100/users/me', header);

    },

    /** Crée un joueur */
    createUser(user: any) : AxiosPromise {
        let userRequest = new UserModel(user);
        userRequest._id = undefined;
        console.log("userRequest :", userRequest);
        return axios.post(routeName + 'signup', userRequest);
    },
};
