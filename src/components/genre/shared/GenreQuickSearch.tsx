import React, {useEffect, useState} from "react";
import QuickSearchMultiple, {QSLabelChoicesWithImg} from "../../commons/quicksearch/quickSearchMultiple";
import {GenreService} from "../../../services/genreService";
import {AxiosResponse} from "axios";
import {GenreModel} from "../../../models/genreModel";

const GenreQuickSearch = (props : {
    setChoices:  (genres: GenreModel[]) => void | React.Dispatch<React.SetStateAction<GenreModel[]>>,
    choices? : string[]

}) =>  {
    const [chosenGenres, setChosenGenres] = useState<string[]>(props.choices ? props.choices : []);
    const [genreStock, setGenreStock] = useState<GenreModel[] >([]);
    const [defaultOptions, setDefaultOptions ] = useState<QSLabelChoicesWithImg[]>([]);
    const [options, setOptions] = useState<QSLabelChoicesWithImg[]>([]);

    useEffect(()=>{
        GenreService.getGenres("",9999).then((response:AxiosResponse) =>{
            let tmpOptions: QSLabelChoicesWithImg[] = [];
            let tmpDefaultOptions: QSLabelChoicesWithImg[] = [];

            let tmpGenreStocks: GenreModel[] = [];
            if(response.data.content && response.data.content.length !== 0) {
                response.data.content.forEach((genre :GenreModel) => {
                    if(chosenGenres.includes(genre._id)) {
                        tmpDefaultOptions.push({
                            label: genre.genre,
                            _id: genre._id
                        })
                    }
                    tmpGenreStocks.push(genre)
                    tmpOptions.push({
                        label : genre.genre,
                        _id : genre._id
                    });
                });
                setGenreStock(tmpGenreStocks)
                setDefaultOptions(tmpDefaultOptions);
                setOptions(tmpOptions);
            }
        });
    }, []);
    //Conversion from name to genre for return
    useEffect(() => {
        const listGenre: GenreModel[] = [];
        genreStock.forEach((genre : GenreModel) => {
            if(chosenGenres.includes(genre._id))
                if(genre._id)
                    listGenre.push(genre)
        });
        props.setChoices(listGenre)
    }, [chosenGenres])
    return (
        <QuickSearchMultiple listOfChoices={options} setChoices={setChosenGenres} defaultOptions={defaultOptions} label={"Genre"}/>
        )
};
export default GenreQuickSearch;