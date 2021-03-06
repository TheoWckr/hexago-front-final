import React, { useEffect, useState} from 'react';
import './App.css';
import Header from "./components/commons/headers/Header";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import GameList from "./components/game/list/gameList";
import {MAIN_ADRESS} from "./utils/utilsAxios";
import {
    Switch,
    Route
} from 'react-router';
import GameDisplayPage from "./components/game/display/gameDisplayPage";
import GameCreatePage from "./components/game/create/gameCreatePage";
import {GenreCRUDPage} from "./components/genre/page/genreCRUDPage";
import {LoginPage} from "./components/user/login/loginPage";
import {RegisterPage} from "./components/user/register/registerPage";
import {AuthContext, useAuth} from './services/hooks/useAuth';
import EventCreatePage from "./components/event/create/eventCreatePage";
import EventUpdatePage from "./components/event/update/eventUpdatePage";
import {ChatComponent} from './components/chat/ChatComponent';
import {EmailVerificationComponent} from './components/email/EmailVerificationComponent';
import {Home} from "./components/home/home";
import EventDisplayPageLoader from "./components/event/display/EventDisplayPageLoader";
import EventSearchPage from "./components/event/search/eventSearchPage";
import {SnackContext, useSnack} from "./services/hooks/useSnackBar";
import GuardedRoute from "./components/commons/guard/guardedRoute";
import UserEditLoaderPage from "./components/user/edit/userEditLoaderPage";
import {Dashboard} from "./components/dashboard/Dashboard";
import {Footer} from "./components/commons/footer/footer";


const socketIOClient = require('socket.io-client');

const App = (props: { location: any }) => {
    const {isLogged, signIn, token, disconnect, userId, currentUser,loginResolved, refresh} = useAuth();
    const {openSnack, snack} = useSnack("");

    const [previousValueLocation, setPreviousValueLocation] = useState("")
    useEffect(() => {
        const socket = socketIOClient(MAIN_ADRESS);
    }, [])
    useEffect(() => {
        setPreviousValueLocation(props.location.pathname)
    }, [props.location])
    const shouldRefresh = (): boolean => {
        return props.location.pathname != previousValueLocation
    }

    return (
        // @ts-ignore
        <AuthContext.Provider value={{isLogged, signIn, token, disconnect, userId, currentUser, refresh}}>
            <SnackContext.Provider value={{openSnack}}>
                <Header/>

                {loginResolved &&(
                    <TransitionGroup appear={shouldRefresh()} enter={shouldRefresh()} exit={shouldRefresh()}>
                        <CSSTransition key={props.location.key} classNames="fade" timeout={{
                            appear: 1800,
                            enter: 500,
                            exit: 300
                        }}>
                            <Switch >
                                <Route exact path="/">
                                    <Home/>
                                </Route>
                                <GuardedRoute component={GameCreatePage} path={"/GameCreate/:id?"} exact={true} auth={true}/>
                                <Route path="/GameDisplay/:id">
                                    <GameDisplayPage/>
                                </Route>
                                <Route path="/GameSearch/">
                                    <GameList/>
                                </Route>
                                <GuardedRoute component={GenreCRUDPage} path={"/GenreManagement/"} exact={true} auth={true}/>
                                <Route exact path="/event">
                                    <EventSearchPage/>
                                </Route>
                                <GuardedRoute component={EventCreatePage} path={"/event/create"} exact={true} auth={true}/>
                                <GuardedRoute component={EventUpdatePage} path={"/event/update/:id"} exact={true} auth={true}/>
                                <Route path="/event/display/:id">
                                    <EventDisplayPageLoader/>
                                </Route>
                                <Route path="/event/search">
                                    <EventSearchPage/>
                                </Route>
                                <GuardedRoute component={UserEditLoaderPage} path={"/user/edit"} exact={true} auth={true}/>
                                <GuardedRoute component={LoginPage} path={"/login"} exact={true} auth={false}/>
                                <GuardedRoute component={RegisterPage} path={"/register"} exact={true} auth={false}/>
                                <GuardedRoute component={ChatComponent} path={"/chat"} exact={true} auth={true}/>
                                <Route path="/email/:id/verify/:token">
                                    <EmailVerificationComponent/>
                                </Route>
                                <Route path="/dashboard">
                                    <Dashboard/>
                                </Route>

                            </Switch>

                        </CSSTransition>

                    </TransitionGroup>
                )}

                {snack()}
            </SnackContext.Provider>
        </AuthContext.Provider>
    );
};

export default App;
