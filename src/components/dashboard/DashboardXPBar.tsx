import React, {useContext, useState, useEffect} from "react";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Container, Box} from "@material-ui/core";
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const levels = [
    {
        "name": "Novice",
        "reached": false,
        "points": 0,
        "percent": 10,
        "percentValue": 2,
    },
    {
        "name": "Intermédiaire",
        "reached": false,
        "points": 10,
        "percent": 30,
        "percentValue": 1,
    },
    {
        "name": "Pro",
        "reached": false,
        "points": 30,
        "percent": 50,
        "percentValue": 1,
    },
    {
        "name": "Expert",
        "reached": false,
        "points": 50,
        "percent": 70,
        "percentValue": 0.666666,
    },
    {
        "name": "Légendaire",
        "reached": false,
        "points": 80,
        "percent": 90,
        "percentValue": 0
    }
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        xpbar: {
            position: "relative",
            width: "100%",
            backgroundColor: "grey",
            height: "5px"
        },
        xpbarfilled: {
            position: "absolute",
            backgroundColor: "#951B81",
            height: "5px",
        },
        dot: {
            backgroundColor: "grey",
            height: "20px",
            width: "20px",
            borderRadius: "20px",
            margin: "auto"
        },
        dotValid: {
            backgroundColor: "#951B81"
        },
        xpbarcontainer: {
            marginBottom: "8%",
        },
        xplabelscontainer: {
            position: "relative",
            top: "-7px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
        },
        xplabelcontainer: {
            display: "flex",
            flexDirection: "column",
            width: "150px",
            color: "grey"
        },
        xplabelTitle: {
            [theme.breakpoints.down("md")]: {
                fontSize: "12px",
            },
        }
    })
)

const DashboardXPBar = (props: { XP: number}) => {
    const classes = useStyles();
    const [filledWidth, setFilledWidth] = useState<string>();
    const [filledDots, setFilledDots]= useState<string[]>(["grey", "grey", "grey", "grey", "grey"]);

    useEffect (() => {
        let dots = [];
        let score = props.XP;
        let filled = 10;
        let percentValue = 1;
        let lastPoints = 0;
        for (let lvl of levels) {
            if (score >= lvl.points) {
                dots.push("#951B81");
                filled = lvl.percent;
                lastPoints = lvl.points;
                percentValue = lvl.percentValue;
            }
            else
                dots.push("grey");
        }
        filled += (score  - lastPoints) * percentValue;
        if (score > 80) {
            filled = 100;
        }
        setFilledWidth(filled + "%");
        setFilledDots(dots);
    })

    return (
        <div className={classes.xpbarcontainer}>
            <div className={classes.xpbar}>
                <div className={classes.xpbarfilled} style={{width: filledWidth}}></div>
                <div className={classes.xplabelscontainer}>
                    <div className={classes.xplabelcontainer}>
                        <div className={classes.dot} style={{backgroundColor: filledDots[0]}}>
                        </div>
                        <h2 className={classes.xplabelTitle}>Novice</h2>
                    </div>
                    <div className={classes.xplabelcontainer}>
                        <div className={classes.dot} style={{backgroundColor: filledDots[1]}}>
                        </div>
                        <h2 className={classes.xplabelTitle}>Intermédiaire</h2>
                    </div>
                    <div className={classes.xplabelcontainer}>
                        <div className={classes.dot} style={{backgroundColor: filledDots[2]}}>
                        </div>
                        <h2 className={classes.xplabelTitle}>Pro</h2>
                    </div>
                    <div className={classes.xplabelcontainer}>
                        <div className={classes.dot} style={{backgroundColor: filledDots[3]}}>
                        </div>
                        <h2 className={classes.xplabelTitle}>Expert</h2>
                    </div>
                    <div className={classes.xplabelcontainer}>
                        <div className={classes.dot} style={{backgroundColor: filledDots[4]}}>
                        </div>
                        <h2 className={classes.xplabelTitle}>Legendaire</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardXPBar;
