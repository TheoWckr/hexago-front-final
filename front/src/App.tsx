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
import {LoginPage} from "./components/user/login/loginPage";
import {RegisterPage} from "./components/user/register/registerPage";

const App = () => {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/GameCreate/:id?">
                    <GameCreatePage/>
                </Route>
                <Route path="/GameDisplay/:id">
                    <GameDisplayPage/>
                </Route>
                <Route path="/GameSearch/">
                    <GameList/>
                </Route>
                <Route path="/GenreManagement/">
                    <GenreCRUDPage/>
                </Route>

                <Route exact path="/login">
                    <LoginPage/>
                </Route>

                <Route exact path="/register">
                    <RegisterPage/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
