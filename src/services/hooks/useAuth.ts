// Hook (use-auth.js)
import {useState, createContext, useEffect} from "react";
import {UserService} from "../userService";
interface AuthType{
    currentUser : UserData |undefined,
        isLogged : boolean,
        token : string | null,
        signIn : (email : string,password : string, withAutoLogin?: boolean) => boolean,
        disconnect: () => void,
    refresh: () => void,
    userId : string,
}
const  AuthTypeDefault : AuthType = {
    currentUser: undefined,
    isLogged : true,
    token : null,
    signIn : () => false,
    disconnect: () => {},
    refresh : () =>{},
    userId : "",
}

// Provider empty because we can't create hook outside of component
export const AuthContext =  createContext<AuthType>(AuthTypeDefault);

export interface UserData {
        _id: string,
        createdAt: Date,
        email : string,
        firstname: string,
        lastname:string,
        username: string,
        img: {url:string, id:string},
        userProfile : string,
        dateOfBirth: Date
}

export function useAuth() {
    const [token, setToken] = useState<string | null>(localStorage.getItem('autoLogin') ? localStorage.getItem('token') : null)
    const [currentUser, setCurrentUser] = useState<UserData |undefined>();
    const [isLogged, setIsLogged] = useState(false);
    const[userId, setUserId] = useState("")
    const [loginResolved, setLoginResolved] = useState(false)
    /**
     * Fonction called on login and autoLogin
     * @param email
     * @param password
     * @param withAutoLogin
     */
    const  signIn = async (email: string, password: string, withAutoLogin?: boolean): Promise<boolean> => {
        if (withAutoLogin) {
            localStorage.setItem("autoLogin", "true")
        }
        let isLogged = false;
        await UserService.login({
            email: email,
            password: password
        }).then(result => {
            if (result) {
                isLogged = true;
                setToken(result.data.token)
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)
            }
        }).catch(() => {
            setToken(null)
        } )

        return isLogged;
    };
    const refresh = () => {
        setToken(token)
    }

    /**
     * hook to log out at any moment
     */
    const disconnect = () => {
       setToken(null);
       setIsLogged(false);
       setUserId("");
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
            setLoginResolved(true);
        } else {
            disconnect()
            setLoginResolved(true);
        }
    };

   useEffect(() => {
           autoLogin()
        });

   useEffect(() => {
       console.log("Modif use effec token ");
       (async function anyNameFunction() {
       if(token){
           setIsLogged( true)
           await UserService.me(token)
               .catch(() => autoLogin())
               .then((result) => {
                       if(result) {
                           console.log(result)
                           setCurrentUser(result.data)
                           setUserId(result.data._id)
                           localStorage.setItem("userId",result.data._id )
                           localStorage.setItem("token",token )
                       }
                   }
               )
       } else {
           setCurrentUser(undefined)
           setIsLogged(false)
           localStorage.removeItem('token');
           localStorage.removeItem("email")
           localStorage.removeItem("password")
           localStorage.removeItem("userId")
       }
       })();
    },[token]);


    return {
        currentUser,
        isLogged,
        token,
        signIn,
        disconnect,
        userId,
        loginResolved,
        refresh
    };

}