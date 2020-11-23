import React from 'react';
import './App.css';
import Header from "./components/commons/headers/Header";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GameList from "./components/game/list/gameList";

import {
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
import EventSearchPanel from "./components/event/search/eventSearchPanel";

const App = (props : {location : any}) => {
    const {isLogged, signIn, updateToken, token, currentUser, disconnect} = useAuth();

    return (
        <AuthContext.Provider value={{isLogged, signIn, updateToken, token, currentUser, disconnect}}>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={props.location.key} classNames="fade" timeout={{
                        appear: 1500,
                        enter: 500,
                        exit : 300
                    }}>
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
                    <Route path="/event/create" >
                        <EventCreatePage/>
                    </Route>
                    <Route path="/event/update/:id">
                        <EventUpdatePage/>
                    </Route>
                    <Route path="/event/display/:id" >
                        <EventDisplayPage/>
                    </Route>
                    <Route path="/event/search">
                        <EventSearchPanel/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage/>
                    </Route>
                </Switch>
                    </CSSTransition>
                </TransitionGroup>
        </AuthContext.Provider>
    );
};

export default App;
