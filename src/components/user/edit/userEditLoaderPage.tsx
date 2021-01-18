import {useParams} from "react-router";
import React, {useContext, useEffect, useState} from "react";
import EventDisplayType from "../../../models/event/eventDisplayType";
import {EventService} from "../../../services/eventService";
import EventDisplayPage from "../../event/display/eventDisplayPage";
import {AuthContext, UserData} from "../../../services/hooks/useAuth";
import {CircularProgress} from "@material-ui/core";
import {UserEditPage} from "./userEditPage";

const UserEditLoaderPage = () => {
    const {currentUser} = useContext(AuthContext)

    if(currentUser){
        return (<UserEditPage user={currentUser} />)
    }
    else return (<CircularProgress />)
};

export default UserEditLoaderPage;