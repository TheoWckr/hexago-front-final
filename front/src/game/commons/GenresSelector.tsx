import * as React from "react";
import {GameEditProps, GameProps, GenreProps} from "../../models/propsDeclaration";
import {Divider, Input, Typography} from "@material-ui/core";
import GenreList from "./gender/GenderListComponent";
import {genderMockList2} from "../../data-mock/GenderMock";
import {GenreModel} from "../../models/genreModel";
import {useEffect, useState} from "react";
import {GenreService} from "../../services/genreService";
import {AxiosAdapter, AxiosResponse} from "axios";


interface State {
    genders: GenreModel[];
}

/**
 * Selection system for adding or removing gender from a certain list
 * @param props the list to modify
 * @constructor
 */
const GenresSelector = (props : GenreProps) => {
    const  [genresInput,setGenresInput] = useState('');
   const  [genresSearched, setGenresSearched] = useState([] as GenreModel[]);
   useEffect(() => {
       const updateGenreSearched = [] as GenreModel [];
       GenreService.getGenres(genresInput,10).then((response:AxiosResponse) =>{
        if(response.data.content && response.data.content.length !== 0) {
            response.data.content.forEach((genre :any) => updateGenreSearched.push(new GenreModel(genre)));
            setGenresSearched(updateGenreSearched);
        }
    });
   },[genresInput]);

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
            <Typography>
                Genre Selected
            </Typography>
            <GenreList genres={props.genres} ClickHandler={funRemove}/>
            <Typography>
                Genre Search
            </Typography><Input placeholder="Placeholder" onChange={(event)=> setGenresInput(event.target.value)} inputProps={{'aria-label': 'description'}}/>
           <Divider />
            <GenreList genres={genresSearched.filter((genre) => props.genres.filter((genreProps) => genre._id === genreProps._id).length === 0)} ClickHandler={funAdd}/>
        </div>);
};

export default GenresSelector;