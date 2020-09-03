// Hook (use-auth.js)
import {useState, createContext, useEffect} from "react";
import {UserService} from "../userService";
import {AuthModel} from "../../models/authModel";

// Provider hook that creates auth object and handles state
export const AuthContext =  createContext(undefined as any );

export function useAuth() {
    const [auth, setAuth] = useState(new AuthModel());
    const [isLogged, setIsLogged] = useState(false);

    const signIn = (email :string , password : string) => {
       return UserService.login({
            email : email,
            password: password}).then(result => {
                setToken(result.data.token)
        })
    };

    const setToken = ( newToken : string | undefined) => {
        setAuth(prevState => {
            if(newToken) {
                prevState.token = newToken;
                localStorage.setItem('token', newToken);
                setIsLogged(true);
                console.log(isLogged);
            }
            else {
                localStorage.removeItem('token');
                prevState.token = undefined;
                setIsLogged(false);
            }
                return prevState;
            }
        )
    };

    const disconnect = () => {
        setAuth(prevState => {
            prevState.token = undefined;
            setIsLogged(false);
            return prevState;
        });
    };

    const token = () => {
        return auth.token
    };
    const user =() => {
        return auth.user
    };

   useEffect(() => {
                setAuth(auth);
        },[]);

    return {
        user,
        isLogged,
        token,
        setToken,
        signIn,
        disconnect
    };

}