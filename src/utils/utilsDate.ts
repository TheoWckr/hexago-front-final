import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

export const UtilsDate = {

    toDisplay(date : string | Date) : string {
        if (typeof date === 'string')
        return Intl.DateTimeFormat('fr-FR').format( new Date (date));
        else
            return Intl.DateTimeFormat('fr-FR').format( date);
    },
    toDisplayWithTime(date : string |Date ) : string {
        if (typeof date === 'string'){
            const tempDate = new Date(date)
            return this.toDisplay(tempDate)+` à ${tempDate.getHours()}h${tempDate.getMinutes() > 10 ? tempDate.getMinutes() : "0"+tempDate.getMinutes() } `
        } else
            return this.toDisplay(date)+` à ${date.getHours()}:${date.getMinutes()} `
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
