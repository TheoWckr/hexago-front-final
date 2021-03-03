import React, {useContext, useEffect, useState} from "react";
import {Button, createStyles, CssBaseline, Grid, Paper, Theme, Typography} from "@material-ui/core";
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
        centralBar:{

        }
    }),
);

export const UserEditPage = (props: { user: UserData }) => {
    console.log(props.user)
    const classes = useStyles();
    const [firstName, setFirstName] = useState(props.user.firstname)
    const [lastName, setLastName] = useState(props.user.lastname)
    const [userName, setUserName] = useState(props.user.username)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [passwordCheck, setPasswordCheck] = useState("")
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [email, setEmail] = useState(props.user.email)

    useEffect(() => setPasswordMatch(password === passwordCheck)
        , [password, passwordCheck])
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container justify="center">
                <Typography variant={"h3"}> Informations personnelles</Typography>
            </Grid>

            <Grid container spacing={0} direction="row" justify="center" className={classes.centralBar}
                  alignItems="center">
                <Grid container item xs={6}
                      direction="column"
                      justify="center"
                      alignItems="center">
                    <TextField label={"Prénom"} onChange={event => setFirstName(event.target.value)} value={firstName}/>
                    <TextField label={"Nom de famille"} onChange={event => setLastName(event.target.value)}
                               value={lastName}/>
                    <TextField label={"Date de naissance"} value={UtilsDate.toDisplay(props.user.dateOfBirth)}/>

                </Grid>
                <Grid container item xs={6}>
                    <Grid item xs={6}>
                        <TextField label={"Pseudo"} onChange={event => setUserName(event.target.value)}
                                   value={userName}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label={"Email"} onChange={event => setEmail(event.target.value)} value={email}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={"Mot de passe actuel"} onChange={event => setPassword(event.target.value)}
                                   value={password}/>
                    </Grid>
                    <Grid item container xs={6}>
                        <TextField label={"Nouveau mot de passe "}
                                   onChange={event => setNewPassword(event.target.value)}
                                   value={newPassword}/>
                    </Grid>
                    <Grid item container xs={6}>
                        <TextField label={"Confirmation mot de passe"}
                                   onChange={event => setPasswordCheck(event.target.value)} value={passwordCheck}/>
                    </Grid>
                </Grid>
            </Grid>
            <Button disabled={!passwordMatch}> Sauvegarder</Button>
        </div>
    );
};