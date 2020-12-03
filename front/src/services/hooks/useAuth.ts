// Hook (use-auth.js)
import {useState, createContext, useEffect} from "react";
import {UserService} from "../userService";
import {UserModel} from "../../models/userModel";

// Provider empty because we can't create hook outside of component
export const AuthContext =  createContext(undefined as any );

export interface UserData {
    _id: string,
        createdAt: Date,
        email : string,
        firstName: string,
        lastName:string,
        userName: string,
        img: {url:string, id:string},
        userProfile : string
}

export function useAuth() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('autoLogin') ? localStorage.getItem('token') : null)
    const [currentUser, setCurrentUser] = useState<UserData |undefined>();
    const [isLogged, setIsLogged] = useState(false);
    const[userId, setUserId] = useState("")
    /**
     * Fonction called on login and autoLogin
     * @param email
     * @param password
     */
    const signIn = (email :string , password : string) => {
       return UserService.login({
            email : email,
            password: password}).then(result => {
                console.log("signInOk")
                if(result){
               setToken(result.data.token)
                }
        }).catch(() => setToken(null))
    };

    /**
     * hook to log out at any moment
     */
    const disconnect = () => {
       setToken(null);
        localStorage.removeItem('autoLogin')
        localStorage.removeItem('email')
        localStorage.removeItem('password')
    };
    /**
     * lauch at the start to allow
     */
    const autoLogin = async () => {
        const autoLogin = localStorage.getItem("autoLogin")
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")

        if(autoLogin && email && password ){
            await signIn(email, password)
        } else {
            disconnect()
        }
    };

   useEffect(() => {
       (async function anyNameFunction() {
           await autoLogin()
       })();
        },[]);

   useEffect(() => {
       (async function anyNameFunction() {
       if(token){
           setIsLogged( true)
           localStorage.setItem('token', token);
           await UserService.me(token)
               .catch(() => setToken(null))
               .then((result) => {
                       if(result) {
                           console.log("Connected")
                           setCurrentUser(result.data)
                           setUserId(result.data._id)
                           localStorage.setItem("userId",result.data._id )
                       }
                   }
               )
       } else {
           setCurrentUser(undefined)
           setIsLogged(false)
           localStorage.removeItem('token');
           localStorage.removeItem("email")
           localStorage.removeItem("password")
           console.log('Storage ', localStorage.getItem('token'))
       }
       })();
    },[token]);


    return {
        currentUser,
        isLogged,
        token,
        signIn,
        disconnect,
        userId
    };

}