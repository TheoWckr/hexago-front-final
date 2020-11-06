import React, {useEffect} from "react";
import {Grid, Typography, Box, Divider, createStyles, Theme, Card} from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GenreList from "../../genre/shared/GenreListComponent";
import CardContent from '@material-ui/core/CardContent';
import {UtilsDate} from "../../../utils/utilsDate";
import {Rating} from "@material-ui/lab";
import {useHistory, useParams} from "react-router";
import {GameService} from "../../../services/gameService";
import {GameModel} from "../../../models/gameModel";
import PlayerNumber from "../shared/PlayerNumber";
import GameDuration from "../shared/GameDuration";
import GameAgeMin from "../shared/GameAgeMin";
import GameExtentionDisplay from "../shared/GameExtentionDisplay";






const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        carroussel: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        paper:{
            padding : theme.spacing(1),
            marginTop : theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        padding:{
            padding :'2em',
        },
        lineHeight:{
            lineHeight :'2em',
        },
        carrousselImage: {
            maxHeight:"450px",
            maxWidth:"300px"
        }
    }),
);

const GameDisplayPage = () => {
    let { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const[gameState, setGameState] = React.useState(new GameModel({}));

    useEffect(  () => {
        if(id) {
          GameService.getGame(id).then((value) => {
                    if(value.data.content) {
                        setGameState(new GameModel(value.data.content));
                    } else
                        history.push("/");
                }
            ).catch(() =>
              history.push("/")
          )
        }
    },[id]);

    return (
        <Box component="div" className={classes.padding }  >
            <Grid container spacing={3}  >
                <Grid item md={6} alignItems={"baseline"}  spacing={3}  className={classes.padding}  >
                    <Typography variant="h4" component="h2" >{gameState.name}  </Typography>
                    <Rating
                        name="customized-empty"
                        defaultValue={gameState.popularity}
                        precision={0.25}
                    />
                    <Card >
                        <CardContent  className={classes.lineHeight} >
                            <Typography variant="body2"  className={classes.lineHeight} > Released : {UtilsDate.toDisplay(gameState.releaseDate)} </Typography>
                            <Divider variant={"inset"}/>
                            <Typography variant="body2"  className={classes.lineHeight}>Author: {gameState.author}</Typography>
                            {gameState.distributor &&
                                <>
                                    <Divider variant={"inset"}  className={classes.lineHeight}/>
                                <Typography variant="body2"  className={classes.lineHeight} > Distributor : {gameState.distributor}</Typography>
                                </>
                            }
                            {gameState.editor &&
                            <>
                                <Divider variant={"inset"}  className={classes.lineHeight}/>
                                <Typography variant="body2"  className={classes.lineHeight} > Editor : {gameState.editor}</Typography>
                            </>
                            }
                        </CardContent>
                    </Card>
                    <GenreList genres={gameState.genres}/>
                    <PlayerNumber playerMin={gameState.playerMin } playerMax={gameState.playerMax}/>
                    <GameDuration gameLengthMin={gameState.gameLengthMin} gameLengthMax={gameState.gameLengthMax}/>
                    <GameAgeMin minAge={gameState.minAge} />
                </Grid>
                <Grid item md={6} >
                </Grid>
                <Grid item xs={6}> <GameExtentionDisplay id={gameState._id} /></Grid>
            </Grid>
        </Box>
    );
};
export default GameDisplayPage;
