import {GameProps, GenderProps} from "../../models/propsDeclaration";
import {Box, Chip, Grid} from "@material-ui/core";
import React from "react";

const GenderList = (props: GenderProps) => {

    function getSpacing(): 2 | 3 | 4 | 6 | 10 {
        if(props.genders.length == 1 ) return 10;
         if(props.genders.length == 2 ) return 6;
         if(props.genders.length == 3 ) return 4;
         if(props.genders.length == 4 ) return 2;
         return 2;
    }
    const genderList = props.genders.map((gender, index) => {
            if (index < 4)
                return <Grid item xs={getSpacing()} > <Chip
                    label={gender.label}
                    clickable
                    color="primary"
                />
                </Grid>
        }
    );
    if (props.genders.length > 0) {
        return (
            <Grid container >
                {genderList}
            </Grid>
        )
    } else return <div/>;
}
export default GenderList;
