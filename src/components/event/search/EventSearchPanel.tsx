import React, {useEffect, useLayoutEffect, useState} from "react";
import {EventSearchProps} from "./eventSearchPage";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker} from "@material-ui/pickers";
import Chip from "@material-ui/core/Chip";
import {makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import GameNameQS from "../../game/shared/GameNameQS";
import {Autocomplete} from "@material-ui/lab";
import {Ville, villes} from "../../../utils/UtilsVilles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filters: {
            marginTop: '1rem',
        },
        filter: {
            textAlign: 'center',
        },
        input: {
            width: '90%',
        },
        game_selection: {
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            padding: '0em',
            marginTop: '0.5em',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        pageTitle: {
            fontWeight: 'normal',
            color: '#994277',
        },
        cards_container: {
        },
        event_card: {
            //border: '1px solid grey',
            backgroundColor: "#FFFFFF",
            borderRadius: '10px',
            boxShadow: '5px 5px 5px 0px silver',
            padding: '1em 1.5em',
        },
        card_autor: {
            alignSelf: "center",
            marginLeft: '0.5em',
        },
        card_affiche_title: {
            marginTop: '0px',
            marginBottom: '0.5em',
        },
        card_games: {
            borderRadius: '0.3em'
        },
        game_chip: {
            margin: '0.1em'
        }
    })
);

const EventSearchPanel = (props:{setSearch :  React.Dispatch<EventSearchProps>}) => {
    const classes = useStyles()

    const [location, setLocation] = useState<string|undefined>();
    const [date, setDate] = useState<Date|undefined>();
    const [gameList, setGameList] = useState<string[]>([])

    useEffect(() => {
        const searchProps : EventSearchProps = {
            date : date,
            listGames : gameList,
            localisation : location
        }
        props.setSearch(searchProps)
    }, [date,gameList,location])
    const setDateFromInput = (input: Date | null) => {
        if(input) {
            setDate(input)
        } else setDate(undefined)
        return input
    }
    return (
        <Grid item xs={12}>
            <Grid container justify="center">
                <Grid key={0} className={classes.filter} xs={12} lg={3} item>
                    <Autocomplete
                        id="localisation"
                        options={villes as Ville[] }
                        getOptionLabel={(ville : {name : string}) => ville.name}
                        multiple={false}
                        // className={`${classes.formInput}`}
                        //type={Localization}
                        renderInput={(params) => <TextField {...params} label="Ville" variant="outlined" />}
                        onChange={(event, value :Ville |null, reason) => {
                            if(value && value.name)
                                setLocation(value.name  )
                            else setLocation(undefined)
                        }}
                        //onKeyPress={(e) => handleKeyPress(e)}
                    />
                </Grid>
                <Grid key={1} className={classes.filter} xs={12} lg={3} item>
                    <KeyboardDatePicker

                        margin="dense"
                        id="date-input"
                        placeholder="Date de l'évènement (dd/mm/yyyy)"
                        format="dd/mm/yyyy"
                        value={date}
                        label={"Date de l'évènement"}
                        onChange={setDateFromInput}
                        KeyboardButtonProps={{
                            'aria-label': 'change birth date',
                        }}
                    />
                </Grid>
                <Grid key={2} className={classes.filter} xs={12} lg={3} item>
                 <GameNameQS setChoices={setGameList} />
                </Grid>
            </Grid>
    </Grid>)
}

export default EventSearchPanel