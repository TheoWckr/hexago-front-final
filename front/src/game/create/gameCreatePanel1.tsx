import {Form, FormikProps} from "formik";
import {FormValues, OtherProps} from "./gameCreate";
import {Grid, TextField} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameProps} from "../../models/propsDeclaration";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import {KeyboardDatePicker} from "@material-ui/pickers";

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(60deg, white 30%,primary 90%)',
        border: 0,
        borderRadius: 3,
        margin:'3%',
        padding: '3%',
    },
});

export const GameCreatePanel1 = (props:GameProps) => {
    const classes = useStylesPanelCreatePage();
    return (  <Grid
              container
              direction="column"
              className={classes.panel}
        >
            <TextField required id="standard-required" label="Titre " multiline
                       value={props.game.name}/>

            <TextField id="standard" label="Author " multiline value={props.game.author}/>
            <TextField id="standard" label="Editor " multiline value={props.game.editor}/>
            <TextField id="standard" label="Distributor " multiline value={props.game.distributor}/>

        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={props.game.releaseDate}
            onChange={() => console.log("change ",)}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
        </Grid>)


};
