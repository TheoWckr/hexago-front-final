import React, {useContext, useEffect, useState} from "react";
import {Button, createStyles, CssBaseline, Grid, Paper, Theme, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AuthContext, UserData} from "../../../services/hooks/useAuth";
import {makeStyles} from "@material-ui/core/styles";
import {UtilsDate} from "../../../utils/utilsDate";
import DragNDropAvatar from "../../commons/dragNDrop/dragNDropAvatarComponent";
import {usePassword} from "../../hooks/usePassword";
import {SnackContext, useSnack} from "../../../services/hooks/useSnackBar";
import {UserService} from "../../../services/userService";
import {UtilsAxios} from "../../../utils/utilsAxios";

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
            padding:'0.5rem'
        },
        innerGrid:{
            padding:'0.3rem'
        }
    }),
);

export const UserEditPage = (props: { user: UserData }) => {
    const classes = useStyles();
    const  openSnack = useContext(SnackContext)
    const [firstName, setFirstName] = useState(props.user.firstname)
    const [lastName, setLastName] = useState(props.user.lastname)
    const [userName, setUserName] = useState(props.user.username)
    const [email, setEmail] = useState(props.user.email)
    const {refresh} = useContext(AuthContext)
    //Password handling
    const [password , componentPassword] = usePassword("","Ancien mot de passe");
    const [newPassword, componentNewPassword] = usePassword("", "Nouveau mot de passe")
    const [passwordCheck, componentPasswordCheck] = usePassword("","Confirmation mot de passe")
    const [passwordMatch, setPasswordMatch] = useState(true)
    //File handling
    const [file,setFile] = useState<File>(new File(new Array<BlobPart>(),""));
    const [urlPicture, setUrlPicture] = useState(props.user.img.url)

    const handleSave = () => {
        console.log(file)
        UserService.updateUser({
            user : {
                email: email,
                firstname: firstName,
                lastname: lastName,
                _id: props.user._id,
                username: userName
            },
            file: file,

        }).then(r =>{
                refresh()
            openSnack.openSnack("Données modifiées")
        }



        ).catch(r => console.warn(r))
    }
    useEffect(() => {
        setPasswordMatch(newPassword === passwordCheck)
        console.log(newPassword)
        }
        , [newPassword, passwordCheck])

    useEffect( () => {
        if(file.size>0)
            setUrlPicture( URL.createObjectURL(file))
        else {
            setUrlPicture("")
        }
    }, [file])
    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Typography variant={"h3"}> Informations personnelles</Typography>
            </Grid>

            <Grid container  direction="row" justify="center"
                  alignItems="center" className={classes.grid} >
                <Grid container item xs={4}
                      direction="column"
                      justify="center"
                      alignItems="center"
                      className={classes.centralBar}>
                    <DragNDropAvatar setFile={setFile} file={urlPicture} />

                    <TextField  className={classes.textBox} label={"Prénom"} onChange={event => setFirstName(event.target.value)} value={firstName}/>
                    <TextField className={classes.textBox} label={"Nom de famille"} onChange={event => setLastName(event.target.value)}
                               value={lastName}/>
                    <TextField className={classes.textBox} label={"Date de naissance"} value={UtilsDate.toDisplay(props.user.dateOfBirth)}/>

                </Grid>
                <Grid container item xs={8}  className={classes.grid}
                      alignItems="center" >
                    <Grid container item>
                    <Grid item container xs={4} >
                        <TextField className={classes.textBox} label={"Pseudo"} fullWidth onChange={event => setUserName(event.target.value)}
                                   value={userName}/>
                    </Grid>
                    <Grid item container xs={4}>
                        <TextField fullWidth className={classes.textBox} label={"Email"} onChange={event => setEmail(event.target.value)} value={email}/>
                    </Grid>
                    </Grid>


                    <Grid item container xs={4} alignItems="center" >
                        {componentNewPassword}
                    </Grid>
                    <Grid item container xs={4} >
                        {componentPasswordCheck}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center" >
                <Button disabled={!passwordMatch} onClick={handleSave} className={classes.btn}> Sauvegarder</Button>
            </Grid>
        </div>
    );
};
