import {Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GameProps} from "../../models/propsDeclaration";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import {KeyboardDatePicker} from "@material-ui/pickers";

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

export const GameCreatePanel1 = (props:GameProps) => {
    const [isExtension, setIsExtension ] = React.useState(false);
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
            label="Is an extension"
            labelPlacement="end"
        />
        {displayExtension()}
        <TextField required id="standard-required" label="Titre " multiline
                       className={classes.textField}
                       value={props.game.name}/>

            <TextField id="standard" className={classes.textField} label="Author " multiline value={props.game.author}/>
            <TextField id="standard" className={classes.textField} label="Editor " multiline value={props.game.editor}/>
            <TextField id="standard" className={classes.textField} label="Distributor " multiline value={props.game.distributor}/>

        <KeyboardDatePicker
            className={classes.textField}
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={props.game.releaseDate}
            onChange={() => console.log("change ",)}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
        </Grid>)


};
