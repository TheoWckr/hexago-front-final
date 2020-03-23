import React from "react";
import ListCard from "./listCard";
import detail from '../../data-mock/gameDetailMockList';

const GameList = () => {
    return (
        <div>
            <ListCard data={detail}/>
        </div>
    );
};

export default GameList;
