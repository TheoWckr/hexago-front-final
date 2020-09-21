// Hook (use-auth.js)
import {useState, createContext, useEffect} from "react";
import {UserService} from "../userService";
import {UserModel} from "../../models/userModel";

// Provider hook that creates auth object and handles state
export const AuthContext =  createContext(undefined as any );

export function useAuth() {
    const [token, setToken] = useState(null as String | undefined | null)
    const [currentUser, setCurrentUser] = useState(undefined as UserModel |undefined);
    const [isLogged, setIsLogged] = useState(false);
    /**
     * Fonction called on login
     * @param email
     * @param password
     */
    const signIn = (email :string , password : string) => {
       return UserService.login({
            email : email,
            password: password}).then(result => {
                updateToken(result.data.token)
        })
    };

    /**
     * function used to change token
     * leading to set the others values
     * @param newToken, if null , remove all datas
     */
    const updateToken = (newToken : string | null) => {
        setToken(prevState => {
            if(newToken) {
                prevState = newToken;
                localStorage.setItem('token', newToken);
                setIsLogged(true);
                console.log(isLogged);
            }
            else {
                localStorage.removeItem('token');
                prevState = undefined;
                setIsLogged(false);
            }
                return prevState;
            }
        )
    };

    /**
     * hook to log out at any moment
     */
    const disconnect = () => {
       updateToken(null);
    };
    /**
     *
     */
    const autoLogin = () => {
        updateToken(localStorage.getItem('token'));

    };

   useEffect(() => {
                autoLogin()
        },[]);

    return {
        currentUser,
        isLogged,
        token,
        updateToken,
        signIn,
        disconnect
    };

}