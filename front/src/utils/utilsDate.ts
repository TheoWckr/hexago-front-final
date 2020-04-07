import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

export const UtilsDate = {
    toDisplay(date : string) : string {
        return Intl.DateTimeFormat('fr-FR').format( new Date(date));
    },
    toStringFromMUIDateFormat(date : MaterialUiPickersDate) : string{
        if(date) {
            return new Date(date.toString()).toString();
        }
        else return new Date().toString();
    },
    toDate(input : string) : Date {
        return new Date(input);
    }
};
