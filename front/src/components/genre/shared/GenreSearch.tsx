import * as React from "react";
import {Input, Typography} from "@material-ui/core";
import GenreList from "./GenreListComponent";
import {GenreModel} from "../../../models/genreModel";
import {useEffect, useState} from "react";
import {GenreService} from "../../../services/genreService";
import {AxiosResponse} from "axios";


/**
 *  Selection system for searching genre and applying th clickHandler function in it
 *  genresHidden a list of genres that does not appear in the display
 *  clickHandler
 * @constructor
 */
const GenreSearch = (props : {
    genresHidden: GenreModel[],
    clickHandler?: ((genre: GenreModel) => void),
     inline? : boolean}
    ) => {
    const  [genresInput,setGenresInput] = useState('');
    const  [genresSearched, setGenresSearched] = useState([] as GenreModel[]);
    useEffect(() => {
        const updateGenreSearched = [] as GenreModel [];
        GenreService.getGenres(genresInput,5).then((response:AxiosResponse) =>{
            if(response.data.content && response.data.content.length !== 0) {
                response.data.content.forEach((genre :any) => updateGenreSearched.push(new GenreModel(genre)));
                setGenresSearched(updateGenreSearched);
            }
        });
    },[genresInput]);


    return (<div className="iflx mx-2-childs">
        <Typography variant={props.inline ? 'body1' : 'h5' }  style={props.inline ? {} :  {padding: '1.3em'}}>
            Recherche de genre
        </Typography>
        <Input placeholder="Quick Search" style={{width : '40%', margin: 'auto'}} onChange={(event)=> setGenresInput(event.target.value)} inputProps={{'aria-label': 'description'}}/>
        <GenreList genres={genresSearched.filter((genre) => props.genresHidden.filter((genreProps) => genre._id === genreProps._id).length === 0)} ClickHandler={props.clickHandler}/>
    </div>);
};

export default GenreSearch;