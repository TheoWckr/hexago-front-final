import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {EventModel} from "../../../models/eventModel";
import {Container, createStyles, Grid, Slider, Theme, Typography} from "@material-ui/core";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {marksGameDuration, marksGameNumPlayer} from "../../../models/gameModel";
import {RichTextEditor} from "../../commons/richText/RichTextEditor";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {makeStyles} from "@material-ui/core/styles";
import {createEventForm} from "../../../models/service/eventServiceType";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    }),
);


let eventFormValue : createEventForm = {
    minPlayers: 4,
    maxPlayers: 8,
    date: new Date(),
    locationId:"",
    details:'',
    duration:90,
    listGames: [],
    phone:''
}


const EventCreateForm = (props: {
    setButtonDisabled : (arg0: boolean) => void
}) => {
    const [event,setEvent] = useState(eventFormValue)
    useEffect(() => {
        console.log('Test ',event )
        if(event.date && event.details.trim().length > 0
            && event.phone.trim().length > 8 && event.locationId.trim().length > 0 )
            props.setButtonDisabled(false)
        else             props.setButtonDisabled(true)
    }, [event.details]);
    
    const classes = useStyles();
    const handleEditorChange = (content: string) => {
        setEvent(prevState => {
                prevState.details = content;
                return prevState;
            }
        )
        setEvent({ ...eventFormValue})
    };

    const setLocalization = (value: string) => {
        setEvent(prevState => {
            prevState.locationId = value;
            return prevState;
        });
    };
    const setPhoneNumber = (value: string) => {
        setEvent(prevState => {
            prevState.phone = value;
            return prevState;
        });
    };

    const setDate = (value: MaterialUiPickersDate) => {
        if (value) {
            setEvent(prevState => {
                prevState.date = new Date(value.getDate());
                return prevState;
            });
        }
    };

    const setNumPlayers = (event: any, value: number | number[]) => {
        if (typeof value === "number") {
            setEvent(prevState => {
                    prevState.minPlayers = value;
                    prevState.maxPlayers = value;
                    return prevState
                }
            );
        } else {
            setEvent(prevState => {
                    prevState.minPlayers = value[0];
                    prevState.maxPlayers = value[1];
                    return prevState;
                }
            );
        }
    };

    function valueLabelFormat(value: number) {
        return marksGameDuration[marksGameDuration.findIndex(mark => mark.value === value)].hiddenLabel;
    }

    function setDuration(event: React.ChangeEvent<{}>, value: (number | number[])) {
        if (typeof value == "number")
            setEvent(prevState => {
                prevState.duration = value;
                return prevState;
            });
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    container
                    item
                    md={6}
                    sm={12}
                    direction={"column"}
                    alignContent={"space-around"}
                    spacing={4}
                >
                    <Grid item>
                        <TextField
                            id="title"
                            label="Donnez un nom à votre évènement"
                            margin="normal"
                            multiline={false}
                            onChange={event => event}
                            //onKeyPress={(e) => handleKeyPress(e)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="localisation"
                            // className={`${classes.formInput}`}
                            //type={Localization}
                            label="Localisation"
                            margin="normal"
                            onChange={event => setLocalization(event.target.value)}
                            //onKeyPress={(e) => handleKeyPress(e)}
                            variant="outlined"
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
                    md={6}
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
                            value={event.date}
                            onChange={setDate}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}> Téléphone</Typography>
                        <PhoneInput
                            country={'fr'}
                            value={event.phone}
                            onChange={setPhoneNumber}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant={"caption"} color={"textSecondary"}> Durée de l'évènement</Typography>
                        <Slider
                            onChange={setDuration}
                            defaultValue={[60]}
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
                <Typography align={"center"} variant={"body1"}> Description de l'évènement</Typography>
                <RichTextEditor
                    handleEditorChange={handleEditorChange}
                    initialValue={"<p>Details</p>"}
                    height={"300"}
                />
            </Grid>
        </div>
    )
};

export default EventCreateForm;
