import {Grid, Paper} from "@material-ui/core";
import React, {Dispatch, SetStateAction} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameEditProps} from "../../../models/propsDeclaration";
import DragNDropImage from "../../commons/dragNDrop/dragNDropImageComponent";
import {useStylesPanelCreatePage} from "./gameCreatePage";

makeStyles({
    root: {
        background: 'linear-gradient(60deg, white 30%,primary 90%)',
        border: 0,
        borderRadius: 3,
        margin: '3%',
        padding: '3%',
    },
    paper: {
        padding: '3%'
    }
});

interface GameCreatePanel3Props extends GameEditProps {
    urlReturn: string
    setFile: Dispatch<SetStateAction<File>>
}

const GameCreatePanel3 = (props: GameCreatePanel3Props) => {
    const classes = useStylesPanelCreatePage();
    return (
        <Paper elevation={3} className={classes.paper}>
            <Grid
                container
                direction="row"
                className={classes.panel}
            >
                    <DragNDropImage setFile={props.setFile} file={props.urlReturn}/>
            </Grid>
        </Paper>
    )
};

export default GameCreatePanel3;
