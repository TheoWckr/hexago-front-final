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
     * Fonction called on login
     * @param email
     * @param password
     */
    const signIn = (email :string , password : string) => {
       return UserService.login({
            email : email,
            password: password}).then(result => {
               setToken(result.data.token)
        })
    };

    /**
     * function used to change token
     * leading to set the others values
     * @param newToken, if null , remove all datas
     */
    const updateToken = (newToken : string | null) => {
        setToken(newToken);
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
                            localStorage.setItem('userId', result.data._id);
                            setUserId(result.data._id)
                        }
                    }
                    )
            }
            else {
                localStorage.removeItem('token');
                prevState = null;
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
       setToken(null);
        localStorage.removeItem('autoLogin')
        localStorage.removeItem('email')
        localStorage.removeItem('email')
    };
    /**
     * lauch at the start to allow
     */
    const autoLogin = async () => {
        const autoLogin = localStorage.getItem("autoLogin")
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("email")

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