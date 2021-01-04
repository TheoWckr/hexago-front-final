import React, {useEffect, useState} from "react";
import GameService from "../../../services/gameService";
import {AxiosResponse} from "axios";
import {GameModel} from "../../../models/gameModel";
import ListCard from "../list/listCard";

const GameExtentionDisplay = (props : {id?: string}) => {
    const [games, setGames] = useState([] as GameModel[])
    useEffect(() => {
        if(props.id)
        GameService.getGamesPage( 0,undefined,undefined,props.id).then((result: AxiosResponse) => {
            let stock: GameModel[] = [];
            result.data.content.forEach((game: {}) => {
                stock.push(new GameModel(game));
            });
            setGames(stock);
        }).catch((message: any) => console.error( 'error' , message));
        },[props.id]);

    if(props.id && games.length !==0)
        return (
            <ListCard games={games}/>
        );
    else return (<div></div>)
};

export default GameExtentionDisplay;
