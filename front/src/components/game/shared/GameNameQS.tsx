import React, {useEffect, useState} from "react";
import GameService from "../../../services/gameService";
import QuickSearchMultiple, {QSLabelChoicesWithImg} from "../../commons/quicksearch/quickSearchMultiple";
import {GameModel} from "../../../models/gameModel";

const GameNameQS = (props : {
   setChoices:  React.Dispatch<React.SetStateAction<string[]>>
}) =>  {
    const [chosenGames, setChosenGames] = useState<string[]>([]);
    const [options, setOptions] = useState<QSLabelChoicesWithImg[]>([]);
    const [gameStock, setGameStock] = useState<GameModel[] >([]);

    useEffect(()=>{
            GameService.getGamesForQuickSearch("").then((result => {
                console.log('result QS', result);
                let stock: QSLabelChoicesWithImg[] = [];
                let gameStock1: GameModel[] = [];

                result.data.content.forEach((game: GameModel) => {
                  // if(game._id && !chosenGames.includes(game._id))
                    gameStock1.push(game)
                    if(game._id)
                    stock.push({
                        _id: game._id!,
                        label: game.name,
                        url:  game.img?.url
                    });
                });
                setGameStock(gameStock1)
                setOptions(stock);
            }))

    }, []);
    //Conversion name to idGame pour transmettre au dessus
    useEffect(() => {
        props.setChoices(chosenGames)
    }, [ chosenGames])
    return (
<QuickSearchMultiple listOfChoices={options} setChoices={setChosenGames} label={"Recherche de jeux"}/> )};
export default GameNameQS;