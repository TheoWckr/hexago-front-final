import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import GameService from "../../../services/gameService";
import QuickSearchMultiple from "../../commons/quicksearch/quickSearchMultiple";
import {GameModel} from "../../../models/gameModel";

const GameNameQS = (props : {
   setChoices:  React.Dispatch<React.SetStateAction<string[]>>
}) =>  {
    const [chosenGames, setChosenGames] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [gameStock, setGameStock] = useState<GameModel[] >([]);

    useEffect(()=>{
            GameService.getGamesForQuickSearch("").then((result => {
                console.log('result QS', result);
                let stock: string[] = [];
                let gameStock1: GameModel[] = [];

                result.data.content.forEach((game: GameModel) => {
                  // if(game._id && !chosenGames.includes(game._id))
                    gameStock1.push(game)
                    stock.push(game.name);
                });
                setGameStock(gameStock1)
                setOptions(stock);
            }))

    }, []);
    //Conversion name to idGame pour transmettre au dessus
    useEffect(() => {
        const listIdGame: string[] = [];
        gameStock.forEach((game : GameModel) => {
            if(chosenGames.includes(game.name))
                if(game._id)
                listIdGame.push(game._id)
        });
        props.setChoices(listIdGame)
    }, [chosenGames])
    return (
<QuickSearchMultiple listOfChoices={options} setChoices={setChosenGames} /> )};
export default GameNameQS;