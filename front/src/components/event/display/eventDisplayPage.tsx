import React, {useContext, useEffect, useState} from 'react';
import {Button, Grid, Typography} from "@material-ui/core";
import './EventDisplay.css';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import EventDisplayType from "../../../models/event/eventDisplayType";
import {EventService} from "../../../services/eventService";
import {AuthContext} from "../../../services/hooks/useAuth";
import {AxiosResponse} from "axios";
import {UtilsDate} from "../../../utils/utilsDate";
import {useHistory} from "react-router";
import Chip from "@material-ui/core/Chip";
import {Call} from "@material-ui/icons";
import CallToAction from "../../home/callToAction";
import {SnackContext} from "../../../services/hooks/useSnackBar";

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
        btnCancel: {
            color: 'red',
            fontSize: '1.1rem',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 50,
            borderColor: 'red',
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
const EventDisplayPage = (props : {event : EventDisplayType, refresh: () => void}) => {
    const {userId} = useContext(AuthContext)
    const [displaySubscribeButton, setDisplaySubscribeButton] = useState(false);
    const [displayUnsubscribeButton, setDisplayUnsubscribeButton] = useState(false);
    const {openSnack} = useContext(SnackContext)
    const history = useHistory()
    //Use Effect de gestion de l'affichage des boutons subscribe et unsubscribe
    useEffect(() => {
        let subButton = true
        let unsubButton = true
        if(props.event.listPlayers.includes(userId)){
            subButton = false
        } else {
            unsubButton = false
        }
        if(props.event.currentPlayers === props.event.maxPlayers) {
            subButton = false
        }
        if(!userId || userId.length ==0 || props.event.owner._id === userId ) {
            subButton = false
            unsubButton = false
        }
        setDisplaySubscribeButton(subButton)
        setDisplayUnsubscribeButton(unsubButton)
    },[props.event])

    const subscribe = async () => {
        await EventService.subscribeEvent(props.event._id)
            .catch((reason: any) => {

            })
            .then(((value: AxiosResponse<any> ) => {
                if(value){
                    openSnack("Vous êtes désormais inscrit a cet événement")
                    props.refresh()
        }}))
    }
    const unsubscribe = async () => {
        await EventService.unSubscribeEvent(props.event._id, userId)
            .catch((reason: any) => {})
            .then(((value: any) => {
                props.refresh()
                openSnack("Vous n'êtes désormais plus inscrit à cet événement")
            }))
    }
    const classe = useStyles();
        return (
            <Grid container className="main">
                <Grid item xs={6} className="box">
                    <div className="box-detail">
                        <Grid container>
                            <Grid item xs={12} className="title-detail">
                                <Typography className={'bold'}>{UtilsDate.toDisplayWithTime(props.event.date)} </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={'title'}>A l'affiche:</Typography>
                                {props.event.listGames.map((item: {_id : string, name : string, img?:{url:string}}) =>
                                    <Button key={item._id}variant="outlined" color="primary"  style={{margin:"0.5em 1em"}} onClick={() => history.push('/gamedisplay/' +item._id)}>
                                     <Avatar src={item.img?.url} style={{height:"1.2em",width:"1.2em"}} /> {item.name}
                                    </Button>
                                )}
                            </Grid>
                            <Grid item xs={12} className={'inline'}>
                                <Typography className={'title'}>Durée de l'évènement: </Typography>
                                <Typography className={'bold-text'}>{props.event.duration} minutes</Typography>
                            </Grid>
                            <Grid item xs={12} className={'inline'}>
                                <Typography className={'title'}>Nombre de participants: </Typography>
                                <Typography className={'bold-text'}>{props.event.currentPlayers}/{props.event.maxPlayers}</Typography>
                            </Grid>
                            <Grid item xs={12} className={'inline'}>
                                <Typography className={'title'}>
                                    Créé par:
                                </Typography>
                                <div className={'inline-nospace'}>
                                    <Typography className={'bold-text'}>{props.event.owner.username}</Typography>
                                    <Avatar alt="user"
                                            src="https://placekitten.com/300/200"/>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography dangerouslySetInnerHTML={{__html: props.event.details}}/>
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
                    {(!userId || userId.length ==0) && <CallToAction />}
                    {   displaySubscribeButton && <Button variant="outlined" className={classe.btn} onClick={subscribe} >Participer à l'évènement</Button>}
                    {displayUnsubscribeButton &&<Button variant="outlined" className={classe.btnCancel} onClick={unsubscribe} >Annuler ma participation </Button>}

                </Grid>
            </Grid>
        )
}

export default EventDisplayPage;
