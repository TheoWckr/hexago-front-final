import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";
import {GameModel} from "../../../models/gameModel";
import GameService from "../../../services/gameService";
import {type} from "os";
import QuickSearchMultiple from "../../commons/quicksearch/quickSearchMultiple";

const GameNameQS = () =>  {
    const [chosenGames, setChosenGames] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(()=>{
            GameService.getGamesForQuickSearch("").then((result => {
                console.log('result QS', result);
                let stock: string[] = [];
                result.data.content.forEach((game: any) => {
                   if(game._id && !chosenGames.includes(game._id))
                    stock.push(game.name);
                });
                setOptions(stock);
            }))

    }, []);
    return (
<QuickSearchMultiple listOfChoices={options} setChoices={setChosenGames} /> )};
export default GameNameQS;