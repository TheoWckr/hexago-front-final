import ChildCareIcon from "@material-ui/icons/ChildCare";
import {Typography} from "@material-ui/core";
import React from "react";

const GameAgeMin = (props : {minAge?: number}) => {
    if(props.minAge)
        return (
            <Typography variant="body1" id="age">
                <ChildCareIcon  color="primary"/>
                {props.minAge +' and + '}
            </Typography>
        );
    else return (<></>)
};

export default GameAgeMin;