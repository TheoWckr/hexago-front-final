import React, {useState} from "react";
import ListPagination from "./listPagination";
import {GameSearchPanel} from "../search/GameSearchPanel";
import GameSearchProps from "../../../models/game/gameSearch";

const GameList = () => {
    const initialState : GameSearchProps = {
        genres: [],
    }

    const [gameSearch, setGameSearch] = useState<GameSearchProps>(initialState)
    return (
        <div>
          <GameSearchPanel setSearch={setGameSearch}/>
            <ListPagination search={gameSearch}/>
        </div>
    );
};
export default GameList;