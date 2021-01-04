import React, {useEffect, useLayoutEffect, useState} from 'react';
import './App.css';
import Header from "./components/commons/headers/Header";
import {TransitionGroup, CSSTransition} from "react-transition-group";
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
import EventCreatePage from "./components/event/create/eventCreatePage";
import EventUpdatePage from "./components/event/update/eventUpdatePage";
import {ChatComponent} from './components/chat/ChatComponent';
import {Home} from "./components/home/home";
import EventDisplayPageLoader from "./components/event/display/EventDisplayPageLoader";
import EventSearchPage from "./components/event/search/eventSearchPage";
import {SnackContext, useSnack} from "./services/hooks/useSnackBar";

const socketIOClient = require('socket.io-client');

const App = (props: { location: any }) => {
    const {isLogged, signIn, token, disconnect, userId, currentUser} = useAuth();
    const {   openSnack,snack} = useSnack("");

    const[previousValueLocation, setPreviousValueLocation]  =useState("")
    useEffect(() => {
        const socket = socketIOClient("http://localhost:3100");

    }, [])
    useEffect(() => {
       setPreviousValueLocation(props.location.pathname)
    }, [props.location])
    // useEffect(() => {
    //     window.onbeforeunload = beforeUnload;
    //     function beforeUnload()
    //     {
    //         return //Une fonction qui sera appelé a la déconnexion 
    //     }
    // }, [])
    const shouldRefresh = () :boolean => {
        return props.location.pathname != previousValueLocation
    }


    return (
        // @ts-ignore
        <AuthContext.Provider value={{isLogged, signIn, token, disconnect, userId,currentUser}}>
            <SnackContext.Provider value={{openSnack}} >
            <Header/>
            <TransitionGroup appear={ shouldRefresh()} enter={shouldRefresh()} exit={shouldRefresh()}>
                <CSSTransition  key={props.location.key} classNames="fade" timeout={{
                    appear: 1800,
                    enter: 500,
                    exit: 300
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
                            <EventSearchPage/>
                        </Route>
                        <Route path="/event/create">
                            <EventCreatePage/>
                        </Route>
                        <Route path="/event/update/:id">
                            <EventUpdatePage/>
                        </Route>
                        <Route path="/event/display/:id">
                            <EventDisplayPageLoader/>
                        </Route>
                        <Route path="/event/search">
                            <EventSearchPage/>
                        </Route>
                        <Route path="/login">
                            <LoginPage/>
                        </Route>
                        <Route path="/register">
                            <RegisterPage/>
                        </Route>
                        <Route path="/chat">
                            <ChatComponent/>
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
                {snack()}
            </SnackContext.Provider>
        </AuthContext.Provider>
    );
};

export default App;
