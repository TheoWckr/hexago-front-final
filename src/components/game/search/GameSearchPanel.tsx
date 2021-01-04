import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {createStyles, Grid, TextField, Theme} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {GenreModel} from "../../../models/genreModel";
import GenresSelector from "../../genre/shared/GenresSelector";
import GameSearchProps from "../../../models/game/gameSearch";
import GenreQuickSearch from "../../genre/shared/GenreQuickSearch";
import getFieldValue from "react-hook-form/dist/logic/getFieldValue";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: 'center',
            padding: '20px'
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);
export const GameSearchPanel = (props: { search: GameSearchProps, setSearch: Dispatch<SetStateAction<GameSearchProps>> }) => {
    const classes = useStyles();
    const [date,setDate] = useState<undefined|Date>();
    const [genreList,setGenreList] = useState(props.search.genres);
    const [name,setName] = useState(props.search.name);

    useEffect(() => {
        const newState: GameSearchProps = {
            year: date ? date.getFullYear(): undefined,
            genres: genreList,
            name: name
        }
        props.setSearch(newState);
    }, [date,genreList,name]);

    const setGenres = (genres: GenreModel[]) => {
        const arrayGenre: string[] = [];
        genres.forEach(value => arrayGenre.push(value._id))
        setGenreList(arrayGenre);
    }
    const setDateFromInput = (input: Date | null) => {
        if(input) {
            setDate(input)
        } else setDate(undefined)
        return input
    }

    return (
        <Grid container className={classes.root}
              direction="row"   justify="space-around"   alignItems="center">
            <Grid item>
                <TextField id="outlined-search" value={name} label="Jeu" type="search" variant="outlined"
                           onChange={(event =>setName(event.target.value))}/>
            </Grid>
            <Grid item>
                <KeyboardDatePicker
                    margin="none"
                    id="date-picker-dialog"
                    label="Année de parution"
                    format="yyyy"
                    error={false}
                    invalidDateMessage={"Date invalide"}
                    value={date}
                    onChange={(date) => setDateFromInput(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>

            <Grid item>
                <GenreQuickSearch setChoices={genres => setGenres(genres)}/>
            </Grid>
        </Grid>
    )
};
