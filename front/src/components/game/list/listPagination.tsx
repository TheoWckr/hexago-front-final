import * as React from "react";
import Pagination from '@material-ui/lab/Pagination';
import ListCard from "./listCard";
import {GameModel} from "../../../models/gameModel";
import GameService from "../../../services/gameService";
import {AxiosResponse} from "axios";
import GameSearchProps from "../../../models/game/gameSearch";

type PageState = {
    page: number,
    numberGame: number,
    detail: GameModel[]
}

export default class ListPagination extends React.Component<{ search : GameSearchProps}, PageState> {
    getGamesByPage(page: number) {
        GameService.getGamesPage(page).then((result: AxiosResponse) => {
            let stock: GameModel[] = [];

            result.data.content.forEach((game: {}) => {
                console.log('gameReceived', game);
                stock.push(new GameModel(game));
            });
            this.setState({
                detail: stock
            });
        }).catch((message: any) => console.log( 'error' , message));
    }

    countPage() {
        GameService.getAllGames().then((result: AxiosResponse) => {
            let calc = result.data.content.length / 12 < 1 ? 1 : Math.ceil(result.data.content.length / 12);

            this.setState({
                numberGame: calc
            });
        });
    }

    handleChange = (event: any, value: number) => {
        let page = value - 1;

        this.getGamesByPage(page);
        this.setState({
            page: page
        });
    };

    componentWillMount() {
        this.setState({
            page: 0,
            detail: []
        });
    };

    componentDidMount() {
        this.getGamesByPage(this.state.page);
        this.countPage();
    }

    render() {
        return (
            <div>
                <ListCard games={this.state.detail}/>
                <Pagination count={this.state.numberGame} onChange={this.handleChange}/>
            </div>
        )
    }
}
