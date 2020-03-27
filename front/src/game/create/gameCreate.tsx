import React from 'react';
import {withFormik, FormikProps, FormikErrors, Form, Field} from 'formik';
import {gameAgeMinMarks, gameDurationMarks, GameModel} from "../../models/gameModel";
import gameData from "../../data-mock/gameData";
import {Grid, Slider, TextField, Typography} from "@material-ui/core";

import DragNDropImage from "../commons/dragNDrop/dragNDropImageComponent";
import {RichTextEditor} from "../commons/richText/richText";
import {KeyboardDatePicker} from '@material-ui/pickers';
import makeStyles from "@material-ui/core/styles/makeStyles";
import GenderSelector from "../commons/GenderSelector";
import {genderMockList} from "../../data-mock/GenderMock";

export interface FormValues {
    email: string;
    password: string;
    game: GameModel
}

export interface OtherProps {
    message: string;
}


const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(60deg, white 30%,primary 90%)',
        border: 0,
        borderRadius: 3,
        margin:'3%',
        padding: '3%',
    },
});
// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code..
// InjectedFormikProps was artifact of when Formik only exported a
//  It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {

    function valueLabelFormat(value: number) {
        return gameDurationMarks[gameDurationMarks.findIndex(mark => mark.value === value)].hiddenLabel ;
    }

    const {values, touched, errors, isSubmitting, message} = props;
    const classes = useStyles();
    return (

        <Form>

            <Grid container spacing={2} direction="row"
            >
                <Grid md={3}
                      container item
                      direction="column"
                      className={classes.root}
                >
                    <TextField required id="standard-required" label="Titre " multiline
                               value={values.game.name}/>
                    {touched.game && errors.game != '' && <div>{errors.game}</div>}

                    <TextField id="standard" label="Author " multiline value={values.game.author}/>
                    <TextField id="standard" label="Editor " multiline value={values.game.editor}/>
                    <TextField id="standard" label="Distributor " multiline value={values.game.distributor}/>
                </Grid>

                <Grid md={3}
                      item container
                      direction="column"
                      className={classes.root}
                >
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={values.game.releaseDate}
                        onChange={() => console.log("change ",)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                    <Typography >
                        Minimum Age
                    </Typography>

                    <Slider
                        defaultValue={10}
                        aria-labelledby="discrete-slider-custom"
                        step={1}
                        min={3}
                        max={21}
                        valueLabelDisplay={"on"}
                        marks={gameAgeMinMarks}
                    />

                    <Typography >
                        Duration
                    </Typography>

                    <Slider
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        valueLabelFormat={valueLabelFormat}
                        aria-labelledby="discrete-slider-restrict"
                        marks={gameDurationMarks}
                        step={null}
                        min={15}
                        max={180}
                    />

                    <Typography id="range-slider" gutterBottom>
                        Number of player 
                    </Typography>
                    <Slider
                        defaultValue={[5,8]}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                            min={1}
                            max={16}
                    />
                </Grid>


                <Grid md={3}
                      item
                      container
                      direction="column"
                      className={classes.root}
                >
                    <DragNDropImage/>
                    <RichTextEditor/>
                    <GenderSelector genders={genderMockList}/>
                </Grid>

            </Grid>
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>

    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialEmail?: string;
    game: GameModel;
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
        let objectif = eval("{ " + test + ' : "chiche" }');

        console.log('objectif', objectif);
        let errors: FormikErrors<any> = {};
        if (!(values.game.name != 'test')) {
            errors.game = objectif.bijour;
        } else {
            errors.game = objectif.bijour;
        }
        return errors;
    },

    handleSubmit: values => {
        // do submitting things
    },
})(InnerForm);

const GameCreate = () => (
    <div>
        <MyForm message="Sign up" game={gameData}/>
    </div>
);

export default GameCreate;


