import React from "react";
import ListCard from "./listCard";
import detail from '../../data-mock/gameDetailMockList';

const GameList = () => {
    return (
        <div>
            <div>
                <h1>Game List</h1>
            </div>
            <ListCard data={detail}/>
        </div>
    );
};

export default GameList;
