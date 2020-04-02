import {Chip, Grid, Typography} from "@material-ui/core";
import React from "react";
import {GenderModel} from "../../../models/genderModel";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    chip: {
        margin:'2%',
        padding: '10px',
    },
    container:{
        maxWidth:'70%'
    }
});

const GenderList = (props: {
    genders: GenderModel[],
    ClickHandler?: ((gender: GenderModel) => void) }
    ) => {

    let classes = useStyles();
    function clickFun(event: GenderModel) {
        if (props.ClickHandler)
            props.ClickHandler(event);

        console.log('genderList', props.genders);
    }

    function getSpacing(): 2 | 3 | 4 | 6 | 10 {
        if (props.genders.length == 1) return 10;
        if (props.genders.length == 2) return 6;
        if (props.genders.length == 3) return 4;
        if (props.genders.length == 4) return 2;
        return 2;
    }

    const genderListing = props.genders;
    let genderList =genderListing.map((gender, index) => {
            if (index < 12)
                return <Chip
                    className={classes.chip}
                    key={index}
                    label={gender.label}
                    clickable
                    onClick={() => clickFun(gender)}
                    color="primary"
                />

        }
    );
    if (props.genders && props.genders.length > 0) {
        return (
            <Grid container className={classes.container}>
                {genderList}
            </Grid>
        )
    } else
        return(
        <Chip
        className={classes.chip}
        label="No genders found"
        color="secondary" />
    ) ;
};
export default GenderList;
