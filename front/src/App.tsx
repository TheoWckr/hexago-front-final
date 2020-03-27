import React from 'react';
import logo from './logo.svg';
import Box from '@material-ui/core/Box';
import './App.css';
import Header from "./commons/headers/Header";

import GameCreate from "./game/create/gameCreate";
import GameList from "./game/list/gameList";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import GameDisplayPage from "./game/display/gameDisplayPage";
import gameData from "./data-mock/gameData";
import GameCreatePage from "./game/create/gameCreatePage";

const App = () => {
  return (
      <Router >
        <Header />
          <Switch>
              <Route exact path="/gamecreate">
                  <GameCreatePage />
              </Route>
              <Route path="/gamedisplay">
                  <GameDisplayPage game={gameData} />
              </Route>
              <Route path="/gamelist">
                  <GameList />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
