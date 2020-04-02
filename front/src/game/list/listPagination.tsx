import * as React from "react";
import Pagination from '@material-ui/lab/Pagination';
import ListCard from "./listCard";
import {GameModel} from "../../models/gameModel";
import gameService from "../../services/gameService";
import {AxiosResponse} from "axios";

type PageState = {
    page: number,
    detail: GameModel[]
}

export default class ListPagination extends React.Component<{}, PageState> {
    getGamesByPage(page: number) {
        gameService.getGamesPage(page).then((result: AxiosResponse) => {
            let stock: GameModel[] = [];

            result.data.content.forEach((game: {}) => {
                stock.push(new GameModel(game));
            });
            this.setState({
                detail: stock
            });
        });
    }

    handleChange = (event: any, value: number) => {
        this.setState({
            page: value
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
    }

    render() {
        return (
            <div>
                <ListCard games={this.state.detail}/>
                <Pagination count={5} onChange={this.handleChange}/>
            </div>
        )
    }
}
