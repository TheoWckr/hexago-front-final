import {Chip, Grid, Typography} from "@material-ui/core";
import React from "react";
import {GenreModel} from "../../../models/genreModel";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    chip: {
        margin:'2%',
        padding: '10px',
    },
    container:{
        maxWidth:'70%'
    }
});

const GenreList = (props: {
    genres: GenreModel[],
    ClickHandler?: any }
    ) => {

    let classes = useStyles();
    function clickFun(event: GenreModel) {
        if (props.ClickHandler)
            props.ClickHandler(event);

        console.log('genreList', props.genres);
    }

    const genreListing = props.genres;
    let genreList =genreListing.map((genre, index) => {
            if (index < 12)
                return <Chip
                    className={classes.chip}
                    key={index}
                    label={genre.genre}
                    clickable
                    onClick={() => clickFun(genre)}
                    color="primary"
                />

        }
    );
    if (props.genres && props.genres.length > 0) {
        return (
            <Grid container className={classes.container}>
                {genreList}
            </Grid>
        )
    } else
        return(
        <Chip
        className={classes.chip}
        label="No genres found"
        color="secondary" />
    ) ;
};
export default GenreList;
