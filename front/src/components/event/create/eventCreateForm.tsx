import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {EventModel} from "../../../models/eventModel";
import {Slider} from "@material-ui/core";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./textfield.css"
import {marksGameDuration, marksGameNumPlayer} from "../../../models/gameModel";
import {RichTextEditor} from "../../commons/richText/RichTextEditor";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";


const EventCreateForm = (props : {
    event : EventModel
}) => {
    const [event, setEvent] = useState(props.event);

    const handleEditorChange = (content :string) => {
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

    const setPhoneNumber = (value :string) => {
        setEvent(prevState => {
            prevState.phoneNumber = value;
            return prevState;
        });
    }

    const setDate = (value : MaterialUiPickersDate) =>{
        console.log(value);
        if(value ) {
            console.log(value.toUTCString());

            setEvent(prevState => {
                prevState.date = value.toUTCString();
                return prevState;
            });
        }
    }

    const setNumPlayers = (event: any ,value : number | number[]) => {
        if(typeof value === "number") {
            setEvent(prevState => {
                    prevState.playerMin = value;
                    prevState.playerMin = value;
                    return prevState
                }
            );
        }else{
            setEvent(prevState => {
                prevState.playerMin = value[0];
                prevState.playerMin = value[1];
                return prevState;
            }
        );
        }
    }

    function valueLabelFormat(value: number) {
        return marksGameDuration[marksGameDuration.findIndex(mark => mark.value === value)].hiddenLabel ;
    }

    function setDuration (event: React.ChangeEvent<{}>, value: (number | number[])) {
        if(typeof  value == "number")
        setEvent(prevState => {
            prevState.duration = value;
            return prevState;
        });
    }

    return (
    <>
            <KeyboardDateTimePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value ={event.date}
                onChange={setDate}
            />

            <TextField
                id="email"
                // className={`${classes.formInput}`}
                //type={Localization}
                label="Localization"
                margin="normal"
                onChange={event => setLocalization(event.target.value)}
                //onKeyPress={(e) => handleKeyPress(e)}
                variant="outlined"
            />

            <Slider
                onChange={setNumPlayers}
                defaultValue={[4,6]}
                valueLabelDisplay="auto"
                //valueLabelFormat={valueLabelFormat}
                aria-labelledby="discrete-slider-restrict"
               // aria-labelledby="range-slider"
                min={1}
                max={16}
                marks={marksGameNumPlayer}
            />
            <PhoneInput
            country={'fr'}
            value={event.phoneNumber}
            onChange={setPhoneNumber}
            />

          <RichTextEditor
              handleEditorChange={handleEditorChange}
              initialValue={"<p>Details</p>"}
              height={"300"}
              />

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
        </>
    )
};

export default EventCreateForm;