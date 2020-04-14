import * as React from "react";
import {GenreProps} from "../../../models/propsDeclaration";
import {Typography} from "@material-ui/core";
import GenreList from "./GenreListComponent";
import {GenreModel} from "../../../models/genreModel";
import GenreSearch from "./GenreSearch";

/**
 * Selection system for adding or removing genre from a certain list
 * @param props the list to modify
 * @constructor
 */
const GenresSelector = (props : GenreProps) => {
    const  funAdd = (genre: GenreModel) => {

        if(!props.genres.includes(genre)) {
            let newGenres = props.genres;
            newGenres.push(genre);
            props.changeGenreState('genres', newGenres);
        }
    };

    const funRemove = (genre: GenreModel) => {
        let newGenres = props.genres;
        newGenres.splice(newGenres.indexOf(genre),1);
        props.changeGenreState('genres', newGenres);
    };

        return (<div>
            <Typography variant={'h5'}  style={{padding: '1.3em'}}>
                Genre Selected
            </Typography>
            <GenreList genres={props.genres} ClickHandler={funRemove}/>
            <GenreSearch genres={props.genres} clickHandler={funAdd}/>
             </div>);
};

export default GenresSelector;