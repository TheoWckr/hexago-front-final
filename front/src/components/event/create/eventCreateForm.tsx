import React, {useState} from "react";
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);


const EventCreateForm = (props: {
    event: EventModel
}) => {
    const [event, setEvent] = useState(props.event);
    const classes = useStyles();

    const handleEditorChange = (content: string) => {
        console.log('Content was updated:', event.details);
        setEvent((prevState => {
                prevState.details = content;
                return prevState;
            }
        ))
    }

    const setLocalization = (value: string) => {
        setEvent((prevState: EventModel) => {
            prevState.localization = value;
            return prevState;
        });
    };

    const setTitle = (value: string) => {
        setEvent((prevState: EventModel) => {
            //prevState. = value;
            return prevState;
        });
    };

    const setPhoneNumber = (value: string) => {
        setEvent(prevState => {
            prevState.phoneNumber = value;
            return prevState;
        });
    }

    const setDate = (value: MaterialUiPickersDate) => {
        console.log(value);
        if (value) {
            console.log(value.toUTCString());

            setEvent(prevState => {
                prevState.date = value.toUTCString();
                return prevState;
            });
        }
    }

    const setNumPlayers = (event: any, value: number | number[]) => {
        if (typeof value === "number") {
            setEvent(prevState => {
                    prevState.playerMin = value;
                    prevState.playerMin = value;
                    return prevState
                }
            );
        } else {
            setEvent(prevState => {
                    prevState.playerMin = value[0];
                    prevState.playerMin = value[1];
                    return prevState;
                }
            );
        }
    }

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
                justify="center"
            >
            <Grid
                item
                container
                sm={6}
                xs={6}
                direction={"column"}
                justify="center"

            >

                <TextField
                    id="title"
                    label="Donnez un nom à votre évènement"
                    margin="normal"
                    multiline={false}
                    onChange={event => setTitle(event.target.value)}
                    //onKeyPress={(e) => handleKeyPress(e)}
                    variant="outlined"
                />


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
                <Typography variant={"body1"}> Nombre de joueurs</Typography>
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
            <Grid
                item-container
                xs={6}
                sm={6}
                direction={"column"}
            >

                <KeyboardDateTimePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date de l'évènement"
                    format="dd/MM/yyyy - hh:mm:ss"
                    value={event.date}
                    onChange={setDate}
                />

                <Typography variant={"body1"}> Téléphone</Typography>

                <PhoneInput
                    country={'fr'}
                    value={event.phoneNumber}
                    onChange={setPhoneNumber}
                />
                <Typography variant={"body1"}> Durée de l'évènement</Typography>

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
                <Typography variant={"body1"}> Description de l'évènement</Typography>
                <RichTextEditor
                    handleEditorChange={handleEditorChange}
                    initialValue={"<p>Details</p>"}
                    height={"300"}
                />
            </Grid>
            </Grid>
        </div   >
    )
};

export default EventCreateForm;
