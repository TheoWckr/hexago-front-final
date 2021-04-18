export interface UserUpdateData {
    user :{
        _id: string,
        email : string,
        firstname: string,
        lastname:string,
        username: string,
        password?:string

    }

    file:File,
}
