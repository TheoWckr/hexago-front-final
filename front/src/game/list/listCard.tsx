import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GameCard from "./gameCard";
import gameDetailModel from "../../models/gameDetailModel";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 12
    },
    title: {
        fontSize: 25,
        fontWeight: 600
    },
    grid: {
        marginTop: 12
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 300
    }
});

const ListCard = (props: {games: gameDetailModel[]}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            {props.games.map((value: gameDetailModel, i:number) =>
                <Grid item xs={12} sm={6} xl={4} key={i}>
                    <GameCard game={value}/>
                </Grid>
            )}
        </Grid>
    )
};

export default ListCard;

