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
            borderRight:'0.2rem solid grey',
            padding:'0.3rem'
        },
        textBox: {
          margin: '1rem'
        },
        btn: {
            color: '#312783',
            fontSize: '1.1rem',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 50,
            borderColor: '#312783',
        },
        grid:{
            padding:'1rem'
        },
        innerGrid:{
            padding:'0.3rem'
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

            <Grid container  direction="row" justify="center"
                  alignItems="center" className={classes.grid}>
                <Grid container item xs={4}
                      direction="column"
                      justify="center"
                      alignItems="center"
                      className={classes.centralBar}>
                    <TextField  className={classes.textBox} label={"Prénom"} onChange={event => setFirstName(event.target.value)} value={firstName}/>
                    <TextField className={classes.textBox} label={"Nom de famille"} onChange={event => setLastName(event.target.value)}
                               value={lastName}/>
                    <TextField className={classes.textBox} label={"Date de naissance"} value={UtilsDate.toDisplay(props.user.dateOfBirth)}/>

                </Grid>
                <Grid container item xs={8}  className={classes.grid}
                      justify="center"
                      alignItems="center">
                    <Grid item xs={4} alignItems="center">
                        <TextField className={classes.textBox} label={"Pseudo"} onChange={event => setUserName(event.target.value)}
                                   value={userName}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth className={classes.textBox} label={"Email"} onChange={event => setEmail(event.target.value)} value={email}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className={classes.textBox} label={"Mot de passe actuel"} onChange={event => setPassword(event.target.value)}
                                   value={password}/>
                    </Grid>
                    <Grid item container xs={6}>
                        <TextField className={classes.textBox} label={"Nouveau mot de passe "}
                                   onChange={event => setNewPassword(event.target.value)}
                                   value={newPassword}/>
                    </Grid>
                    <Grid item container xs={6}>
                        <TextField className={classes.textBox} label={"Confirmation mot de passe"}
                                   onChange={event => setPasswordCheck(event.target.value)} value={passwordCheck}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container xs={12} justify="center" >
                <Button disabled={!passwordMatch} className={classes.btn}> Sauvegarder</Button>
            </Grid>
        </div>
    );
};