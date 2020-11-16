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
const   GenresSelector = (props : {
    genres: GenreModel[],
    changeGenreState: ((genre: GenreModel[]) => void),
    inline? : boolean} ) => {
    const  funAdd = (genre: GenreModel) => {
        if(!props.genres.includes(genre)) {
            let newGenres = props.genres;
            newGenres.push(genre);
            props.changeGenreState(newGenres);
        }
    };

    const funRemove = (genre: GenreModel) => {
        let newGenres = props.genres;
        newGenres.splice(newGenres.indexOf(genre),1);
        props.changeGenreState(newGenres);
    };

        return (<div className="iflx mx-2-childs">
            <Typography variant={props.inline ? 'body1' : 'h5' }  style={props.inline ? {} :  {padding: '1.3em'}}>
                Genre sélectionné
            </Typography>
            <GenreList genres={props.genres} ClickHandler={funRemove} />
            <GenreSearch genresHidden={props.genres} clickHandler={funAdd} inline={props.inline}/>
             </div>);
};

export default GenresSelector;