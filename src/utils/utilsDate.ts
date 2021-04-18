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
            return this.dayOfDate(tempDate) +this.toDisplay(tempDate)+` à ${tempDate.getHours()}h${tempDate.getMinutes() > 10 ? tempDate.getMinutes() : "0"+tempDate.getMinutes() } `
        } else
            return this.dayOfDate(date) +this.toDisplay(date)+` à ${date.getHours()}:${date.getMinutes()} `
    },
    toStringFromMUIDateFormat(date : MaterialUiPickersDate) : string{
        if(date) {
            return new Date(date.toString()).toString();
        }
        else return new Date().toString();
    },
    toDate(input : string) : Date {
        return new Date(input);
    },

    dayOfDate(input:Date):string{
        try {
            const day = input.getDay()
            switch (day) {
                case 0:
                    return "Dimanche "
                case 1 :
                    return "Lundi "
                case 2 :
                    return "Mardi "
                case 3 :
                    return "Mercredi "
                case 4 :
                    return "Jeudi "
                case 5 :
                    return "Vendredi "
                case 6 :
                    return "Samedi "
                default :
                    return ""
            }
        }
        catch (e) {
            return ""
        }
    }
};
