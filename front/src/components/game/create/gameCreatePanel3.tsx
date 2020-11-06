import {Grid} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameEditProps} from "../../../models/propsDeclaration";
import DragNDropImage from "../../commons/dragNDrop/dragNDropImageComponent";
import {useStylesPanelCreatePage} from "./gameCreatePage";

makeStyles({
    root: {
        background: 'linear-gradient(60deg, white 30%,primary 90%)',
        border: 0,
        borderRadius: 3,
        margin:'3%',
        padding: '3%',
    },
});

const GameCreatePanel3 = (props : GameEditProps) => {
    const classes = useStylesPanelCreatePage();
    return (
        <Grid
              container
              direction="column"
              className={classes.panel}
        >
            <DragNDropImage/>
        </Grid>
    )
};

export default GameCreatePanel3;
