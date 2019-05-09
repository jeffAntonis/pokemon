import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/Home';
import Information from './pages/Information';
import Create from './pages/Create';

export default (props) => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/create" exact={true} component={Create} />
            <Route path="/:id" component={Information} />
        </Switch>
        {/* <App /> */}
    </BrowserRouter>
);
