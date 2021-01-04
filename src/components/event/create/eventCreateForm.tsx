import React, {useEffect, useState} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {createStyles, Grid, Slider, TextField, Theme, Typography} from "@material-ui/core";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {marksGameDuration, marksGameNumPlayer} from "../../../models/gameModel";
import {RichTextEditor} from "../../commons/richText/RichTextEditor";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";
import {createEventForm} from "../../../models/service/eventServiceType";
import GameNameQS from "../../game/shared/GameNameQS";
import {UtilsDate} from "../../../utils/utilsDate";
import {Ville, villes} from "../../../utils/UtilsVilles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    }),
);



const EventCreateForm = (props: {
    setButtonDisabled : React.Dispatch<React.SetStateAction<boolean>>
    setCreateEventForm : React.Dispatch<React.SetStateAction<createEventForm>>
}) => {
    const [eventDetail, setEventDetail] = useState(`<h2>Details</h2>`)
    const [eventDate,setEventDate] = useState<Date | undefined>(new Date())
    const [eventMinPlayers,setEventMinPlayers] = useState(4)
    const [eventMaxPlayers,setEventMaxPlayers] = useState(6)
    const [eventDuration,setEventDuration] = useState(90)
    const [eventLocationid, setEventLocationId] = useState('')
    const [eventListGames, setEventListGames] = useState<string[]>([])
    const [eventPhone, setEventPhone] = useState('')
    const  eventFormValue : createEventForm = {
        minPlayers: eventMinPlayers,
        maxPlayers: eventMaxPlayers,
        date: eventDate,
        locationId:eventLocationid,
        details: eventDetail,
        duration:eventDuration,
        listGames: eventListGames,
        phone:eventPhone,
        listPlayers: []
    }

    useEffect(() => {
        props.setCreateEventForm(eventFormValue);
    }, [eventDetail, eventDate,eventDuration,eventListGames,eventLocationid,eventMaxPlayers,eventPhone]);
    const classes = useStyles();

    const setNumPlayers = (event: any, value: number | number[]) => {
        if (typeof value === "number") {
            setEventMinPlayers(value)
            setEventMaxPlayers(value)
        } else {
            setEventMinPlayers(value[0])
            setEventMaxPlayers(value[1])
        }
    };
    function valueLabelFormat(value: number) {
        return marksGameDuration[marksGameDuration.findIndex(mark => mark.value === value)].hiddenLabel;
    }    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    container
                    item
                    md={8}
                    sm={12}
                    direction={"column"}
                    alignContent={"space-around"}
                    spacing={4}
                >
                    <Grid item>
                        <GameNameQS setChoices={setEventListGames}/>
                    </Grid>
                    <Grid item>
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
                                setEventLocationId(value.name  )
                                else setEventLocationId("")
                            }}
                            //onKeyPress={(e) => handleKeyPress(e)}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}> Nombre de joueurs</Typography>
                        <Slider
                            onChange={setNumPlayers}
                            defaultValue={[4, 6]}
                            valueLabelDisplay="auto"
                            //valueLabelFormat={valueLabelFormat}
                            aria-labelledby="discrete-slider-restrict"
                            // aria-labelledby="range-slider"
                            min={1}
                            max={16}
                            marks={marksGameNumPlayer}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    md={4}
                    sm={12}
                    direction={"column"}
                    alignContent={"space-around"}
                    spacing={4}
                >
                    <Grid item>
                        <KeyboardDateTimePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date de l'évènement"
                            format="dd/MM/yyyy - hh:mm:ss"
                            value={eventDate}
                            onChange={value => setEventDate(new Date(UtilsDate.toStringFromMUIDateFormat(value)))}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}> Téléphone</Typography>
                        <PhoneInput
                            country={'fr'}
                            value={eventPhone}
                            onChange={((value) =>  setEventPhone(value))}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}> Durée de l'évènement</Typography>
                        <Slider
                            onChange={((event1, value) => setEventDuration(value as number  ))}
                            defaultValue={60}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valueLabelFormat}
                            aria-labelledby="discrete-slider-restrict"
                            marks={marksGameDuration}
                            step={null}
                            min={15}
                            max={180}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid >
                <RichTextEditor
                    handleEditorChange={((content) =>  setEventDetail(content))}
                    initialValue={eventDetail}
                    height={"300"}
                />
            </Grid>
        </div>
    )
};

export default EventCreateForm;
