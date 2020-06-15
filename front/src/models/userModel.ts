import {GenreModel} from "./genreModel";
import {RoleEnum} from "./roleEnum";

export class UserModel {
    _id?: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfCreation: Date;
    dateLastConnection: Date;
    dateOfBirth: Date;
    active: boolean = true;
    role: RoleEnum;


    constructor(
        {
            id = "",
            username= "",
            firstName= "",
            lastName= "",
            email= "",
            phoneNumber = "",
            dateOfCreation = new Date,
            dateLastConnection = new Date,
            dateOfBirth= new Date,
            active = true,
            role= RoleEnum.STANDARD
        }) {
        this._id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfCreation = dateOfCreation;
        this.dateLastConnection = dateLastConnection;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
        this.role = role;
    }
}
