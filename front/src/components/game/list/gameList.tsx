import React from "react";
import ListPagination from "./listPagination";
import {GameSearchPanel} from "../search/GameSearchPanel";

const GameList = () => {
    return (
        <div>
          <GameSearchPanel />
        <ListPagination/>
        </div>
    );
};
export default GameList;