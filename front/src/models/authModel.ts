import {UserModel} from "./userModel";


export class AuthModel{
    user: UserModel | undefined ;
    token : string | undefined ;
    isLogged = false;
}