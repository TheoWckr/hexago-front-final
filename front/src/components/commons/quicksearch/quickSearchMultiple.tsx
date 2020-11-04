import React, {Dispatch, SetStateAction} from "react";
import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

const QuickSearchMultiple = (props:{listOfChoices : string[],
                           setChoices : Dispatch<SetStateAction<string[]>>} ) =>
{
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.listOfChoices}
            multiple
            disableCloseOnSelect
            limitTags={3}
            onChange={(event: any, value: string[] | null) => {
                if(value) props.setChoices(value)
                else props.setChoices([])
            }}
            getOptionLabel={(option) => option}
            style={{ width: 400}}
            renderInput={(params) => <TextField {...params}  label="Selection" variant="outlined" />}
        />
    );
}
export default QuickSearchMultiple;