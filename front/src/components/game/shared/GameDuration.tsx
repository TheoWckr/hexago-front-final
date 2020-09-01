import {Typography} from "@material-ui/core";
import React from "react";
import TimerIcon from "@material-ui/icons/Timer";

const GameDuration = (props : {gameLengthMin? : number, gameLengthMax?: number}) => {
    let stringToDisplay ='';
    if(props.gameLengthMin)
        stringToDisplay += props.gameLengthMin + ' min ';
    if(props.gameLengthMax && props.gameLengthMax !== props.gameLengthMin)
        stringToDisplay += ' - ' +  props.gameLengthMax +'min';

    if(stringToDisplay.length !== 0)
    return (
        <Typography variant="body1" id="duration">
        <TimerIcon  color="primary"/>
            {stringToDisplay}
    </Typography>
    );
    else return (<></>)
};
export default GameDuration