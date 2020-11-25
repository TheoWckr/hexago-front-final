import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';

import {
    BrowserRouter as Router
} from 'react-router-dom';
import DateFnsUtils from "@date-io/date-fns";
import {LocationWrapper} from "./LocationWrapper";

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <meta charSet="utf-8"/>
        <Router>
        <LocationWrapper />
        </Router>
    </MuiPickersUtilsProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
