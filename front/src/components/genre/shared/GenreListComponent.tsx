import {Chip, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
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
    let genreList = props.genres.map((genre, index) => {
            if (index < 12)
                return <Chip
                    className={classes.chip}
                    id={genre.genre}
                    key={genre.genre}
                    label={genre.genre}
                    clickable
                    onClick={() => clickFun(genre)}
                    color="primary"
                />
        }
    );
    useEffect(() => {
        genreList = props.genres.map((genre, index) => {
                if (index < 12)
                    return <Chip
                        className={classes.chip}
                        id={genre.genre}
                        key={genre.genre}
                        label={genre.genre}
                        clickable
                        onClick={() => clickFun(genre)}
                        color="primary"
                    />

            }
        )}, [props.genres]

    );

    return(
        <>
    {props.genres && props.genres.length > 0 &&
         (
            <Grid container className={classes.container} id={'genre-list-grid-container'}>
                {genreList}
            </Grid>
        )}

{(!props.genres || props.genres.length ===0) &&
(<Chip
            id={'genre-list-chip-no-container'}
        className={classes.chip}
        label="No genres found"
        color="secondary" />
        )}
            </>
    ) ;
};
export default GenreList;
