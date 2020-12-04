import React, {useContext} from "react";
import {AuthContext} from "../../services/hooks/useAuth";
import {useHistory} from "react-router";

const CallToAction = () => {
    const {isLogged} = useContext(AuthContext)
    const history = useHistory()
    const call_to_action = () => {
        if(isLogged){history.push('/event/search')}
        else{history.push('/register')}
    }

    return(
        <button className={'callToActionBtn'} onClick={call_to_action}>
            Je participe <span>&rarr;</span>
        </button>
    )
}

export default CallToAction;