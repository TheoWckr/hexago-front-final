import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GameCard from "./gameCard";

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

const ListCard = ({data}: any) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.grid}>
            {data.map((value: any) =>
                <Grid item xs={12} sm={6} xl={4}>
                    <GameCard props={value}/>
                </Grid>
            )}
        </Grid>
    )
};

export default ListCard;

