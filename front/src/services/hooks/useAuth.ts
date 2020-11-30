// Hook (use-auth.js)
import {useState, createContext, useEffect} from "react";
import {UserService} from "../userService";
import {UserModel} from "../../models/userModel";

// Provider empty because we can't create hook outside of component
export const AuthContext =  createContext(undefined as any );
export let currentToken = ''
export function useAuth() {
    const [token, setToken] = useState(null as String | undefined | null)
 //   const [currentUser, setCurrentUser] = useState(undefined as UserModel |undefined);
    const [isLogged, setIsLogged] = useState(false);
    const[userId, setUserId] = useState("")
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
                console.log('new token : ', newToken)
                prevState = newToken;
                localStorage.setItem('token', newToken);
                setIsLogged(true);
                UserService.me(newToken)
                    .catch((err) => console.log("Error", err))
                    .then((result) => {
                        if(result) {
                            console.log("result me : ", result)
                            setUserId(result.data._id)
                        }
                    }
                    )
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
     * lauch at the start to allow
     */
    const autoLogin = () => {
        updateToken(localStorage.getItem('token'));
    };

   useEffect(() => {
       (async function anyNameFunction() {
           await autoLogin()
       })();
        },[]);

    return {
     //   currentUser,
        isLogged,
        token,
        updateToken,
        signIn,
        disconnect,
        userId
    };

}