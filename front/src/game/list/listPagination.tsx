import React from "react";
import {Redirect, Route} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import detail from '../../data-mock/gameDetailMockList';
import ListCard from "./listCard";
import GameList from "./gameList";

const handleChange = (event: any, value: any) => {
    return (
        <Route path="/gamelist">
            <GameList />
        </Route>
    );
};

const listPagination = () => {
    const numberPage = Math.floor(detail.length / 12) < 1 ? 1 : Math.floor(detail.length / 12);

    return (
        <div>
            <ListCard data={detail}/>
            <Pagination count={numberPage} onChange={handleChange}/>
        </div>
    );
};

export default listPagination;
