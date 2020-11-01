import React from 'react';
import {useParams} from "react-router";
import {Button, Grid, Typography} from "@material-ui/core";
import './EventDisplay.css';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import eventData from "../../../data-mock/eventData";
import {GameModel} from "../../../models/gameModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btn: {
            color: '#312783',
            fontSize: '1.1rem',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 50,
            borderColor: '#312783',
        },
        btnDetail: {
            color: '#312783',
            fontSize: '0.7rem',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#312783',
        }
    }),
);

const EventDisplayPage = () => {
    let {id} = useParams();
    const classe = useStyles();
    let data = eventData;
    return (
        <Grid container className="main">
            <Grid item xs={6} className="box">
                <div className="box-detail">
                    <Grid container>
                        <Grid item xs={12} className="title-detail">
                            <Typography>{data.date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>A l'affiche:</Typography>
                            {data.listGames.map((item: GameModel) =>
                                <Button variant="outlined" color="primary">
                                    {item.name}
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{data.duration}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Nombre de participants: {data.nbPlayers}/{data.maxPlayers}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography>
                                        Créé par:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    {data.owner} <Avatar alt="user" src="https://placekitten.com/300/200"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={6} className="box">
                <div className="box-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7449.505429822984!2d6.173500846207366!3d48.69022845072249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4794986e17a692cd%3A0x4ed671b10d82498d!2sNancy!5e0!3m2!1sfr!2sfr!4v1600071064410!5m2!1sfr!2sfr"
                        className="map"
                        allowFullScreen={true}
                        aria-hidden="false"/>
                </div>
            </Grid>
            <Grid item xs={12} className="box-button">
                <Button variant="outlined" className={classe.btn}>Participer à l'évènement</Button>
            </Grid>
        </Grid>
    );
}

export default EventDisplayPage;
