import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import {gameAgeMinmarks, GameModel} from "../../models/gameModel";
import gameData from "../../data-mock/gameData";
import {Slider, TextField, Typography} from "@material-ui/core";

import DragNDropImage from "../commons/dragNDrop/dragNDropImageComponent";
import {RichTextEditor} from "../commons/richText/richText";
import {

    KeyboardDatePicker,
} from '@material-ui/pickers';

interface FormValues {
    email: string;
    password: string;
    game : GameModel
}

interface OtherProps {
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code..
// InjectedFormikProps was artifact of when Formik only exported a
//  It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { values, touched, errors, isSubmitting, message } = props;
    return (

        <Form>

            <h1>{errors.game}</h1>

                <TextField required id="standard-required" label="Titre " multiline defaultValue={values.game.name} />
                {touched.game && errors.game != '' && <div>{errors.game}</div>}

            <TextField required id="standard-required" label="author " multiline value={values.game.author} />
            <TextField required id="standard-required" label="Editor " multiline value={values.game.editor} />
            <TextField required id="standard-required" label="distributor " multiline value={values.game.distributor} />

            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={values.game.releaseDate}
                onChange={()=>console.log("change ", )}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <TextField required id="standard-required" label="Editor " multiline value={values.game.gameLengthMax} />
            <TextField required id="standard-required" label="distributor " multiline value={values.game.distributor} />

            <Typography id="discrete-slider-custom" gutterBottom>
                Custom marks
            </Typography>
            <Slider
                defaultValue={10}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={3}
                max={21}
                valueLabelDisplay="auto"
                marks={gameAgeMinmarks}
            />
            <DragNDropImage/>
            <RichTextEditor/>


            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>

    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialEmail?: string;
    game : GameModel;
    message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => {
        return {
            email: props.initialEmail || '',
            password: '',
            game: props.game
        };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: FormValues) => {
        let test = 'bijour';
        let objectif = eval("{ " + test  + ' : "chiche" }');

        console.log('objectif', objectif);
        let errors: FormikErrors<any> = {};
        if (!(values.game.name != 'test')) {
            errors.game = objectif.bijour ;
        } else  {
            errors.game =  objectif.bijour;
        }
        return errors;
    },

    handleSubmit: values => {
        // do submitting things
    },
})(InnerForm);

// Use <MyForm /> wherevs
const GameCreate = () => (
    <div>
        <MyForm message="Sign up" game={gameData} />
    </div>
);

export default GameCreate;
