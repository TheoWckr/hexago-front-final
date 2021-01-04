import React, {Dispatch, SetStateAction} from "react";
import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

export const QuickSearchUnique = (props:{listOfChoices : string[],
                     setChoice : Dispatch<SetStateAction<string>>} ) =>
{
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.listOfChoices}
            onChange={(event: any, value: string | null) => {
                if(value) props.setChoice(value)
                else props.setChoice('')
            }}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params}  label="Selection" variant="outlined" />}
        />
    );
}