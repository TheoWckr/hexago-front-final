import React, {useContext, useEffect, useState} from "react";
import {createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {UserData} from "../../../services/hooks/useAuth";
import {makeStyles} from "@material-ui/core/styles";
import {UtilsDate} from "../../../utils/utilsDate";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export const UserEditPage = (props: {user : UserData}) => {
    const classes = useStyles();

    const  [firstName, setFirstName] = useState(props.user.firstName)
    const [lastName, setLastName] = useState(props.user.lastName)
    const [userName, setUserName] = useState(props.user.userName)
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordMatch, setPasswordMatch] = useState(true)
    return     (<div className={classes.root}>
            <Typography > Informations personnelles</Typography>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField disabled> {props.user.email}</TextField>
                <TextField disabled> {UtilsDate.toDisplay(props.user.createdAt)}</TextField>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
        </Grid>
    </div>
);
};