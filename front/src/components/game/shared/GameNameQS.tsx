import {CircularProgress, Typography} from "@material-ui/core";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab";
import {GameModel} from "../../../models/gameModel";
import GameService from "../../../services/gameService";

const GameNameQS = () =>  {
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState<GameModel[]>([]);

    useEffect(()=>{
            GameService.getGamesForQuickSearch(search).then((result => {
                let stock: GameModel[] = [];
                result.data.content.forEach((game: {}) => {
                    stock.push(new GameModel(game));
                });
                setOptions(stock);
            }))
    }

    , [search]);
    return (
            <Autocomplete
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} onChange={(event => setSearch(''))} label="Combo box" variant="outlined" />}
            />
        );
};
export default GameNameQS;