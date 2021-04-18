import React, {useState} from "react";
import {createStyles, Grid, IconButton, Snackbar, Theme} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textBox: {
            margin: '1rem'
        }
    }),
);
export function usePassword(defaultValue : string= "", label :string = 'mot de passe' ) {
    const classes = useStyles();

    const [password,setPassword] = useState(defaultValue);
    const passFun = () => "password";
    const component = (
                <TextField type={passFun()}  className={classes.textBox} label={label} fullWidth
                           onChange={(event: { target: { value: any; }; }) => setPassword(event.target.value)} defaultValue={''} />
            );


    return [
        password,
        component
    ]
}
