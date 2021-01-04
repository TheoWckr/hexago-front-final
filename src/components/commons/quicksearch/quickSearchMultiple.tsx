import React, {Dispatch, SetStateAction} from "react";
import {Autocomplete} from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import {Avatar, Typography} from "@material-ui/core";

export interface QSLabelChoicesWithImg {
    _id: string;
    label: string;
    url?: string;
}
const QuickSearchMultiple = (props:{listOfChoices : QSLabelChoicesWithImg[],
                           setChoices : Dispatch<SetStateAction<string[]>>, label?: string, defaultOptions?: QSLabelChoicesWithImg[]} ) =>
{
    return (
        <Autocomplete
            id="combo-box-demo"
            options={props.listOfChoices}
            multiple
            disableCloseOnSelect
            limitTags={1}
            defaultValue={props.defaultOptions ?props.defaultOptions : undefined }
            onChange={(event: any, value: QSLabelChoicesWithImg[] | null) => {
                if(value) props.setChoices(value.map((val)=> val._id))
                else props.setChoices([])
            }}
            getOptionLabel={(option) => option.label}

            renderOption={(option =>
                    <React.Fragment>
                        {(option.url && <Avatar src={option.url}/> )}
                        <Typography > {option.label? option.label : "Sélection"}</Typography>
                    </React.Fragment>
            )}
            style={{ width: 400}}
            renderInput={(params) =>
                    <TextField {...params}  label={props.label? props.label : "Sélection"} variant="outlined" />
                }
        />
    );
}
export default QuickSearchMultiple;