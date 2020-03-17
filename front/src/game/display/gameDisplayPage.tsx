import React from "react";
import {GameModel} from "../../models/gameModel";
import {Grid, Paper, Typography, Box, Chip} from "@material-ui/core";

type GameProps = {
    game: GameModel
}
const GameDisplayPage = (props: GameProps) => {

    return (
        <Box component="div" m={5}>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <h1>{props.game.name}</h1>
                    <div>
                        <Chip
                            label="Primary clickable"
                            clickable
                            color="primary"
                        />
                        <Chip
                            label="Primary clickable"
                            clickable
                            color="primary"
                        />
                        <Chip
                            label="Primary clickable"
                            clickable
                            color="primary"
                        />

                    </div>
                    <Paper>
                        <Typography>Date : {props.game.releaseDate}</Typography>
                        <Typography>Author: {props.game.author}</Typography>
                        <Typography>Distributor : {props.game.distributor}</Typography>
                        <Typography> Editor : {props.game.editor}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={5}> Images </Grid>
                <Grid item xs={2}> Extention</Grid>
            </Grid>

            <div dangerouslySetInnerHTML={{__html: props.game.description}}>

            </div>
        </Box>
    );
};

export default GameDisplayPage;
