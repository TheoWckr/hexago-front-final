import React, {useContext, useState} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        eventList: {
            minHeight: "5.5em",
            maxHeight: "5.5em",
            overflow: "hidden",
            transition: "max-height 250ms",
        },
        eventListExpanded: {
            height: "auto",
            minHeight: "5.5em",
            maxHeight: "15.5em",
            overflow: "hidden",
            transition: "max-height 250ms",
        },
        eventTitle: {
            marginTop: "0",
            marginBottom: "0.5em",
        },
        eventListElem: {
            margin: "0.5em",
        },
        seeMoreContainer: {
            textAlign: "center",
        },
        btntest: {
            backgroundColor: "#221b5c",
            border: "none",
            borderRadius: "3px",
            padding: "1em",
            color: "white"
        },
        seemore: {
            margin: "auto",
            width: "max-content",
            marginTop: "0.5em",
            color: "white",
            fontSize: "14px",
            '&:hover': {
                textDecoration: "underline",
                cursor: "pointer",
            },
        },
    })
)

export const DashboardExpandableEventList = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<boolean|false>();

    const expand = () => {
        setExpanded(true);
    };

    const retract = () => {
        setExpanded(false);
    };

    return (
        <div>
            <div className={expanded ? classes.eventListExpanded : classes.eventList}>
                <p className={classes.eventListElem}>Bordeau (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Marseille (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Metz (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Bordeau (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Marseille (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Metz (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Bordeau (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Marseille (le 28/11/2020)</p>
                <p className={classes.eventListElem}>Metz (le 28/11/2020)</p>
            </div>
            <div className={classes.seeMoreContainer}>
                <p onClick={expanded ? retract : expand} className={classes.seemore}>{expanded ? "Afficher moins d'évènements" : "Afficher plus d'évènements"}</p>
            </div>
        </div>
    )
};

export default DashboardExpandableEventList;
