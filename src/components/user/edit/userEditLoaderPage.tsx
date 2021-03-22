import React, {useContext} from "react";
import {AuthContext} from "../../../services/hooks/useAuth";
import {CircularProgress} from "@material-ui/core";
import {UserEditPage} from "./userEditPage";
import {GridSize} from "@material-ui/core/Grid"

const UserEditLoaderPage = () => {
    const {currentUser} = useContext(AuthContext)

    if(currentUser){
        return (<UserEditPage user={currentUser} />)
    }
    else return (<CircularProgress />)
};

export default UserEditLoaderPage;
