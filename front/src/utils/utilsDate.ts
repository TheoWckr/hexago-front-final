export const UtilsDate = {
    toDisplay(date : string) : string {
        return Intl.DateTimeFormat('fr-FR').format( new Date(date));
    },
    toDate(input : string) : Date {
        return new Date(input);
    }
};
