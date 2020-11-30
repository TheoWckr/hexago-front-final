import * as React from "react";
import Pagination from '@material-ui/lab/Pagination';
import ListCard from "./listCard";
import {GameModel} from "../../../models/gameModel";
import GameService from "../../../services/gameService";
import {AxiosResponse} from "axios";
import GameSearchProps from "../../../models/game/gameSearch";
import {useEffect, useState} from "react";

type PageState = {
    page: number,
    numberGame: number,
    detail: GameModel[]
}

const ListPagination = (props : { search : GameSearchProps}) =>  {

    const [page, setPage] = useState(0)
    const [numberGame, setNumberGame] = useState(0)
    const [detail,setDetail] = useState<GameModel[]> ([])

    useEffect(()=> {
        console.log("listPagination", props.search)
        setPage(0)
        getGamesByPage(0)
    }, [props.search])
    const getGamesByPage = (page: number) =>  {
        GameService.getGamesPage(page, props.search).then((result: AxiosResponse) => {
            let stock: GameModel[] = [];
            console.log("Datas", result.data)
            result.data.content.forEach((game: {}) => {
                stock.push(new GameModel(game));
            });
        setDetail(stock)
        }).catch((message: any) => console.log( 'error' , message));
    }

    const countPage = () => {
        GameService.getAllGames().then((result: AxiosResponse) => {
            let calc = result.data.content.length / 12 < 1 ? 1 : Math.ceil(result.data.content.length / 12);
           setNumberGame(calc)
        });
    }

    const handleChange = (event: any, value: number) => {
        let page = value - 1;
        getGamesByPage(page);
        setPage(page)
    };

    useEffect(() =>  {
        getGamesByPage(page);
        countPage();
    }, []);

            return (
            <div>
                <ListCard games={detail}/>
                <Pagination count={numberGame} onChange={handleChange}/>
            </div>
        )

}
export default ListPagination;