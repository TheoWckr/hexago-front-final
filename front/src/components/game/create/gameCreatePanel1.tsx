import {Checkbox, Divider, FormControlLabel, Grid, TextField, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {GameEditProps} from "../../../models/propsDeclaration";
import {useStylesPanelCreatePage} from "./gameCreatePage";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {useFormContext} from "react-hook-form";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {UtilsDate} from "../../../utils/utilsDate";
import GameNameQS from "../shared/GameNameQS";

export const GameCreatePanel1 = (props: GameEditProps) => {
    const {register} = useFormContext();
    const [isExtension, setIsExtension] = React.useState(false);
    const [extention, setExtention] = useState<string[]>([])
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('name', event.target.value);
    };

    const handleChangeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('author', event.target.value);
    };

    const handleChangeEditor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('editor', event.target.value);
    };

    const handleChangeDistributor = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('distributor', event.target.value);
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changeGameState('description', event.target.value);
    };

    const handleChangeReleasedDate = (date: MaterialUiPickersDate) => {
        props.changeGameState('releaseDate', UtilsDate.toStringFromMUIDateFormat(date));
    };


    const displayExtension = () => {
        if (isExtension) return <GameNameQS setChoices={setExtention} />;
    };

    const handleChangeExtension = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsExtension(event.target.checked);
    };

    const classes = useStylesPanelCreatePage();
    return (<Grid
        container
        direction="column"
        className={classes.panel}
    >
        <Typography variant={'h4'}>
            Mandatory fields </Typography>
        <Divider style={{margin: '0.5em', width: '50%', marginBottom: '1.2em'}}/>


        <TextField required id="standard-required" label="Title " multiline
                   name='name'
                   onChange={handleChangeTitle}
                   className={classes.textField}
                   value={props.game.name}
                   inputRef={register({required: true})}
        />
        <FormControlLabel
            defaultValue="isExtension"
            className={classes.textField}

            control={<Checkbox color="primary" onChange={handleChangeExtension}/>}
            label="Is an extension "
            labelPlacement="end"
        />
        {displayExtension()}

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

        <TextField required id="standard-required" label="Description " multiline
                   name='description'
                   onChange={handleChangeDescription}
                   className={classes.textField}
                   value={props.game.description}
                   inputRef={register({required: true})}
        />

        <Typography variant={'h4'} style={{paddingTop: '0.8em'}}>
           Credits </Typography>
        <Divider style={{margin: '0.5em', width: '50%', marginBottom: '1.2em'}}/>

        <TextField id="standard" onChange={handleChangeAuthor} className={classes.textField} label="Author " multiline
                   value={props.game.author}/>
        <TextField id="standard" onChange={handleChangeEditor} className={classes.textField} label="Editor " multiline
                   value={props.game.editor}/>
        <TextField id="standard" onChange={handleChangeDistributor} className={classes.textField} label="Distributor "
                   multiline value={props.game.distributor}/>
    </Grid>)
};
