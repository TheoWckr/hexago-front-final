import {Chip, Grid} from "@material-ui/core";
import React from "react";
import {GenderModel} from "../../../models/genderModel";
import {Simulate} from "react-dom/test-utils";

const GenderList = (props: {
    genders: GenderModel[],
    ClickHandler?: ((gender: GenderModel) => void) }
    ) => {
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
                return <Grid item> <Chip
                    key={index}
                    label={gender.label}
                    clickable
                    onClick={() => clickFun(gender)}
                    color="primary"
                />
                </Grid>
        }
    );
    if (props.genders && props.genders.length > 0) {
        return (
            <Grid container spacing={getSpacing()}>
                {genderList}
            </Grid>
        )
    } else return <div/>;
};
export default GenderList;
