import React, {useState} from "react";
import { Grid, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {EventSearchProps, eventSearchPropsDefault} from "../event/search/eventSearchPage";
import EventCarrouselListLoader from "../event/list/EventCarrouselListLoader";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#951B81'
    },
});

export const EventCity = () => {
    const classes = useStyles();
    const[search,  setSearch] = useState<EventSearchProps>(eventSearchPropsDefault)
    const[value,setValue] = useState("")
    const changeLocation= () => {
        setSearch({
            localisation: value,
            listGames:[]
        } )
    }
    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
           changeLocation()
        }
    };
    return (
        <div >
            <AppBar position={'static'} className={classes.root} >
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} className="wrap">
                            <h3>
                                INDIQUEZ VOTRE VILLE
                            </h3>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} className="wrap">
                            <div className="search">
                                <input type="text" className="searchTerm" onKeyPress={(e) => handleKeyPress(e)}  onChange={event => setValue(event.target.value)}/>
                                <button className="searchButton"  onClick={changeLocation}>
                                    <SearchOutlinedIcon />
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <EventCarrouselListLoader search={search} />
        </div>
    )
};
