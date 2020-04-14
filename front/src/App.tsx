import React from 'react';
import './App.css';
import Header from "./components/commons/headers/Header";

import GameList from "./components/game/list/gameList";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import GameDisplayPage from "./components/game/display/gameDisplayPage";
import GameCreatePage from "./components/game/create/gameCreatePage";
import {GenreCRUDPage} from "./components/genre/page/genreCRUDPage";

const App = () => {
  return (
      <Router >
        <Header />
          <Switch>
              <Route exact path="/gamecreate/:id?">
                  <GameCreatePage />
              </Route>
              <Route path="/gamedisplay/:id">
                  <GameDisplayPage />
              </Route>
              <Route path="/gamelist">
                  <GameList />
              </Route>
              <Route path="/">
                  <GenreCRUDPage />
              </Route>
          </Switch>
      </Router>
  );
};

export default App;
