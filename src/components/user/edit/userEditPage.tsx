import React, {useContext, useEffect, useState} from "react";
import {Button, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
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
    const  [firstName, setFirstName] = useState(props.user.firstname)
    const [lastName, setLastName] = useState(props.user.lastname)
    const [userName, setUserName] = useState(props.user.username)
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [email, setEmail] = useState(props.user.email)

    useEffect(() => setPasswordMatch(password === passwordCheck)
    ,[password, passwordCheck])
    return     (
        <div className={classes.root}>
            <Typography > Informations personnelles</Typography>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField disabled> {props.user.email}</TextField>
                <TextField disabled> {UtilsDate.toDisplay(props.user.createdAt)}</TextField>
            </Grid>
            <Grid item xs={6}>
                <TextField label={"Pseudo"} onChange={event => setUserName(event.target.value)} value={userName} />
                <TextField label={"Prénom"} onChange={event => setFirstName(event.target.value)} value={firstName}/>
                <TextField label={"Nom de famille"} onChange={event => setLastName(event.target.value)}value={lastName}/>
                <TextField label={"Mot de passe "} onChange={event => setPassword(event.target.value)} value={password} />
                <TextField label={"Confirmation mot de passe"} onChange={event => setPasswordCheck(event.target.value)}value={passwordCheck}/>
            </Grid>

        </Grid>
            <Button disabled={!passwordMatch}> Sauvegarder</Button>
    </div>
);
};