import Typography from "@material-ui/core/Typography";
import React from "react";


export const UtilsDate = {
    toDisplay(date : string) : string {
        return Intl.DateTimeFormat('fr-FR').format( new Date(date));
    },
    toDate(input : string) : Date {
        return new Date(input);
    }
};
