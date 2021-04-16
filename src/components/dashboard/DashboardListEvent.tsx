import React, {useContext, useLayoutEffect, useState} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import EventCardList from '../event/list/EventCardList';
import {EventCardModel} from "../../models/eventModel";
import {EventService} from "../../services/eventService";
import {EventSearchProps} from "../event/search/eventSearchPage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        event: {
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0px 5px 20px -15px black",
            textAlign: "center",
            backgroundColor: "white"
        },
        gameList: {
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        gameContainer: {},
        game: {
            border: "2px solid #951B81",
            borderRadius: "0.3em",
            margin: "3px",
            height: "2em",
            overflow: "hidden",
            lineHeight: "1.5em",
        },
        gameText: {
            color: "#951B81",
            margin: "0.3em"
        },
        events: {

        }
    })
)

export const eventSearchPropsDefault: EventSearchProps = {
    date: new Date(),
    localisation: undefined,
    listGames: []
}

export const DashboardListEvent = () => {
    const classes = useStyles();
    const [events, setEvents] = useState<EventCardModel[]>([])
    const [search, setSearch] = useState<EventSearchProps>(eventSearchPropsDefault)

    useLayoutEffect (() => {
        (async function anyNameFunction() {
            await EventService.searchEvent(search)
                .catch((reason: any) => {})
                .then((value: { data: { content: any; }; }) => {
                    if (value) {
                        setEvents(value.data.content)
                    }
                })
        })();
    }, [search])

    return (
        <EventCardList events={events} vp_size="medium"/>
    )
}

export default DashboardListEvent;
