import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Input from "@material-ui/core/Input";
import {makeStyles} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import eventData from "../../../data-mock/eventData";
import Chip from "@material-ui/core/Chip";
import {GameModel} from "../../../models/gameModel";
import PlayerNumber from "../../game/shared/PlayerNumber";

const eventMock = eventData;

const useStyles = makeStyles(() =>
    createStyles({
        textAlignCenter: {
            textAlign: 'center',
        },
        fullCenter: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem'
        },
        map: {
            width: '100%',
            height: '400px',
            border: 'none',
            borderRadius: '30px',
        },
        participantBox: {
            borderRadius: '30px',
            boxShadow: '-1px 0px 5px 0px rgba(0, 0, 0, 0.75)',
            margin: '2rem 0 2rem 0',
            padding: '1rem'
        },
        fontWeight: {
            fontWeight: 'bolder',
            padding: '1rem'
        },
        avatarBox: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatar: {
            width: '5rem',
            height: '5rem',
        },
        roundedButton: {
            borderRadius: '20px',
            marginBottom: '2rem'
        },
        deleteButton: {
            color: 'red',
            borderColor: 'red',
        },
        saveButton: {
            color: 'green',
            borderColor: 'green',
        },
    }),
);

const EventUpdatePage = () => {
    const classes = useStyles();
    console.log(eventMock);
    const renderGames = eventMock.listGames.map((game: GameModel) =>
        (
            <Chip variant="outlined" clickable={true} label={game.name}/>
        ));
    return (
        <Container>
            <Grid container className={`${classes.textAlignCenter}`}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component={"h1"} className={`${classes.fontWeight}`}>{eventMock.date}</Typography>
                        <PlayerNumber playerMin={eventMock.nbPlayers} playerMax={eventMock.maxPlayers} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6} className={`${classes.fullCenter}`}>
                        <Typography component={"h3"} className={`${classes.fontWeight}`}>
                            Description de l'évènement :
                        </Typography>
                        <TextareaAutosize rowsMin={6} placeholder="Minimum 3 rows"
                                          defaultValue={eventMock.details}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7449.505429822984!2d6.173500846207366!3d48.69022845072249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794986e17a692cd%3A0x4ed671b10d82498d!2sNancy!5e0!3m2!1sfr!2sfr!4v1600071064410!5m2!1sfr!2sfr"
                                allowFullScreen={true}
                                className={classes.map}
                                aria-hidden="false"/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography component={"h3"} className={`${classes.fontWeight}`}>
                            Jeux du moment
                        </Typography>
                        {renderGames}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography component={"h3"} className={`${classes.fontWeight}`}>
                            Mon numéro de téléphone
                        </Typography>
                        <Input defaultValue={"06 33 78 57 29"}/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} className={classes.participantBox}>
                        <Typography component={"h3"} className={`${classes.fontWeight}`}>Les Participants :</Typography>
                        <Grid container>
                            <Grid item xs={3} className={classes.avatarBox}>
                                <Avatar alt="user" className={classes.avatar} src="https://placekitten.com/300/300"/>
                                <Typography>Cat MAN</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.avatarBox}>
                                <Avatar alt="user" className={classes.avatar} src="https://placekitten.com/300/300"/>
                                <Typography>Cat MAN</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.avatarBox}>
                                <Avatar alt="user" className={classes.avatar} src="https://placekitten.com/300/300"/>
                                <Typography>Cat MAN</Typography>
                            </Grid>
                            <Grid item xs={3} className={classes.avatarBox}>
                                <Avatar alt="user" className={classes.avatar} src="https://placekitten.com/300/300"/>
                                <Typography>Cat MAN</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Button variant="outlined" className={`${classes.roundedButton} ${classes.deleteButton}`}>
                            SUPPRIMER <ClearIcon/>
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant="outlined" className={`${classes.roundedButton} ${classes.saveButton}`}>
                            SAUVEGARDER <CheckIcon/>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}


export default EventUpdatePage;
