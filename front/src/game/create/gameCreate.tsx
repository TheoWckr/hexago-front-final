import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import {GameModel} from "../../models/gameModel";
import gameData from "../../data-mock/gameData";
import {TextField} from "@material-ui/core";

// Shape of form values
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
            <h1>{values.game?.name}</h1>


            <div>
                <TextField required id="standard-required" label="Titre " multiline defaultValue={values.game.name} />
                {touched.game && errors.game && <div>{errors.game}</div>}
            </div>

            <Field type="email" name="email" />
            {touched.email && errors.email && <div>{errors.game?.name}</div>}
            <Field type="password" name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}

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
        let errors: FormikErrors<any> = {};
        if (!(values.game.name != 'test')) {
            errors.game = 'Required';
        } else  {
            errors.game = 'Invalid game';
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