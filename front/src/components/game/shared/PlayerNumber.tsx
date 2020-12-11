import { Typography} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import React from "react";

 const PlayerNumber = (props : {playerMin : number, playerMax: number}) => {
    return (<Typography variant="body2">
        <FaceIcon  color="primary"/>
        {props.playerMin === 1 && 'Solo' }
        {props.playerMin === props.playerMax && props.playerMin+ ' joueurs'}
        {props.playerMin !== props.playerMax && props.playerMin + ' - ' + props.playerMax+ ' joueurs' }
    </Typography>)
};
 export default PlayerNumber;