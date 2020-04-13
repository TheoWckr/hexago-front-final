import {Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameEditProps, GameProps} from "../../../models/propsDeclaration";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {useFormContext} from "react-hook-form";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {UtilsDate} from "../../../utils/utilsDate";

// noinspection JSUnusedLocalSymbols
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(60deg, white 30%,primary 90%)',
        border: 0,
        borderRadius: 3,
        padding: '3em',
    },
    textField: {
        padding: '2em',
    },
});

export const GameCreatePanel1 = (props:GameEditProps) => {
    const { register } = useFormContext();
    const [isExtension, setIsExtension ] = React.useState(false);

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('name', event.target.value );
    };

    const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('author', event.target.value );
    };

    const handleChangeEditor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('editor', event.target.value );
    };

    const handleChangeDistributor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('distributor', event.target.value );
    };

    const handleChangeReleasedDate = (date: MaterialUiPickersDate) => {
        props.changeGameState('releaseDate', UtilsDate.toStringFromMUIDateFormat(date));
    };


    const displayExtension = () => {
        if (isExtension) return  <TextField required={true} className={classes.textField} label="extension of"> </TextField>;
        };

    const handleChangeExtension = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsExtension(event.target.checked );
    };

    const classes = useStylesPanelCreatePage();
    return (  <Grid
              container
              direction="column"
              className={classes.panel}
        >

        <FormControlLabel
            defaultValue="isExtension"
            className={classes.textField}

            control={<Checkbox color="primary" onChange={handleChangeExtension}/>}
            label="Is an extension "
            labelPlacement="end"
        />
        {displayExtension()}
        <TextField required id="standard-required" label="Title " multiline
                   name ='name'
                   onChange={handleChangeTitle}
                   className={classes.textField}
                   value={props.game.name}
                   inputRef={register({required : true })}
                   />

            <TextField id="standard"  onChange={handleChangeAuthor} className={classes.textField} label="Author " multiline value={props.game.author}/>
            <TextField id="standard"  onChange={handleChangeEditor} className={classes.textField} label="Editor " multiline value={props.game.editor}/>
            <TextField id="standard"  onChange={handleChangeDistributor} className={classes.textField} label="Distributor " multiline value={props.game.distributor}/>

        <KeyboardDatePicker
            className={classes.textField}
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={props.game.releaseDate}
            onChange={handleChangeReleasedDate}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
        </Grid>)
};
