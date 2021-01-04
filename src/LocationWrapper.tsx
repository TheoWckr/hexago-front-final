import App from "./App";

import {useLocation} from "react-router-dom";
import * as React from "react";

export const LocationWrapper = () => {
    const location = useLocation();

    return <App location={location} /> ;
}