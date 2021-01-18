import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../../../services/hooks/useAuth";

const GuardedRoute: React.FC<{
    component: React.FC
    path: string
    exact: boolean
    auth: boolean
}> = (props) => {
    const {isLogged} = useContext(AuthContext)


    return isLogged === props.auth ? (<Route path={props.path} exact={props.exact} component={props.component}/>) :
        (<Redirect to="/"/>);
}

export default GuardedRoute;
