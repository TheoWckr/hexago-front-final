import React, {useEffect, useState} from "react";
import { Grid, Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {EventSearchProps, eventSearchPropsDefault} from "../event/search/eventSearchPage";
import EventCarrouselListLoader from "../event/list/EventCarrouselListLoader";
import {Autocomplete} from "@material-ui/lab";
import {Ville, villes} from "../../utils/UtilsVilles";
import TextField from "@material-ui/core/TextField";

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

    useEffect(()=> changeLocation(),[value])
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
                                <Autocomplete
                                    id="localisation"
                                    options={villes as Ville[] }
                                    getOptionLabel={(ville : {name : string}) => ville.name}
                                    multiple={false}
                                    className={"autocompleteField"}
                                    onKeyPress={(e) => handleKeyPress(e)}
                                    renderInput={(params) => <div  className="searchTerm"  >
                                        <TextField {...params}  variant="standard"  style={{width:"97%",paddingLeft:"3%"}}  />
                                    </div>}
                                    onChange={(event, value :Ville |null, reason) => {
                                        if(value && value.name)
                                            setValue(value.name  )
                                        else setValue("")
                                    }}
                                />

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
