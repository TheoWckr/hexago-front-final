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
import {AuthContext, useAuth} from './services/hooks/useAuth';
import EventListPage from "./components/event/list/eventListPage";
import EventDisplayPage from "./components/event/display/eventDisplayPage";
import EventCreatePage from "./components/event/create/eventCreatePage";
import EventUpdatePage from "./components/event/update/eventUpdatePage";
import {Home} from "./components/home/home";

const App = () => {
    const {isLogged, signIn, updateToken, token, currentUser, disconnect} = useAuth();

    return (
        <AuthContext.Provider value={{isLogged, signIn, updateToken, token, currentUser, disconnect}}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
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
                    <Route exact path="/event">
                        <EventListPage/>
                    </Route>
                    <Route path="/event/create">
                        <EventCreatePage/>
                    </Route>
                    <Route path="/event/update/:id">
                        <EventUpdatePage/>
                    </Route>
                    <Route path="/event/:id">
                        <EventDisplayPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage/>
                    </Route>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
