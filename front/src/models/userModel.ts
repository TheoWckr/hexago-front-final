import {RoleEnum} from "./roleEnum";

export class UserModel {
    _id?: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    dateOfCreation: Date;
    dateLastConnection: Date;
    dateOfBirth: Date;
    userProfile: Object;
    active: boolean = false;
    role: RoleEnum;


    constructor(
        {
            id = "",
            username= "",
            firstname= "",
            lastname= "",
            email= "",
            password="",
            phone = "",
            dateOfCreation = new Date(),
            dateLastConnection = new Date(),
            dateOfBirth= new Date(),
            active = false,
            role= RoleEnum.STANDARD,
            userProfile={}
        }) {
        this._id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dateOfCreation = dateOfCreation;
        this.dateLastConnection = dateLastConnection;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
        this.role = role;
        this.userProfile={}
    }
}
