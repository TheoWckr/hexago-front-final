import React from 'react';
import './App.css';
import Header from "./commons/headers/Header";

import GameList from "./game/list/gameList";

import {
    BrowserRouter as Router,
    Switch,
    Route
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
};

export default App;
