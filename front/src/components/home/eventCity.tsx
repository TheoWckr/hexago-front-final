import React from "react";
import {Container, Grid, InputBase, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import EventCarousel from "../commons/carroussel/eventCarousel";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import eventData from "../../data-mock/eventData";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#951B81'
    },
});

export const EventCity = () => {
    const classes = useStyles();
    let events = [];

    events.push(eventData);
    events.push(eventData);
    events.push(eventData);
    events.push(eventData);
    events.push(eventData);
    events.push(eventData);
    return (
        <div>
            <AppBar position={'static'} className={classes.root}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} className="wrap">
                            <h3>
                                INDIQUEZ VOTRE VILLE
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} className="wrap">
                            <div className="search">
                                <input type="text" className="searchTerm"/>
                                <button className="searchButton">
                                    <SearchOutlinedIcon/>
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <EventCarousel events={events}/>
        </div>
    )
};
