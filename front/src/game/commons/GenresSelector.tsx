import * as React from "react";
import {GameEditProps, GameProps, GenreProps} from "../../models/propsDeclaration";
import {Divider, Input, Typography} from "@material-ui/core";
import GenderList from "./gender/GenderListComponent";
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

   const  [genres,setGenres] = useState(props.genres);
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

    const  funAdd = (gender: GenreModel) => {
        if(!genres.includes(gender)) {
            genres.push(gender);
            props.changeGenderState('genres', genres);
        }
        console.log('props genres ', genres);
    };

    const funRemove = (gender: GenreModel) => {
        genres.splice(genres.indexOf(gender),1);
        props.changeGenderState('genres', genres);
    };

        return (<div>
            <Typography>
                Gender Selected
            </Typography>
            <GenderList genders={genres} ClickHandler={funRemove}/>
            <Typography>
                Gender Search
            </Typography><Input placeholder="Placeholder" onChange={(event)=> setGenresInput(event.target.value)} inputProps={{'aria-label': 'description'}}/>
           <Divider />
            <GenderList genders={genresSearched.filter((genre) => props.genres.filter((genreProps) => genre._id === genreProps._id).length === 0)} ClickHandler={funAdd}/>
        </div>);
};

export default GenresSelector;