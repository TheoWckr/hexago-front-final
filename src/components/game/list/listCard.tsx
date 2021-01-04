import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GameCard from "./gameCard";
import {GameModel} from "../../../models/gameModel";

const useStyles = makeStyles({
    grid: {
        marginTop: 12,
    }
});

const ListCard = (props: {games: GameModel[]}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            {props.games.map((value: GameModel, i:number) =>
                <Grid item xs={12} sm={6} xl={4} key={i}>
                    <GameCard game={value}/>
                </Grid>
            )}
        </Grid>
    )
};

export default ListCard;

