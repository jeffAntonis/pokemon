import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from './pages/Home';
import Information from './pages/Information';
import Menu from './components/Menu';
import * as serviceWorker from './serviceWorker';
import Create from './pages/Create';

ReactDOM.render(
    <>
        <Menu />
        <Container role="main" style={{ paddingTop: 20 }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                    <Route path="/create" exact={true} component={Create} />
                    <Route path="/:id" component={Information} />
                </Switch>
                {/* <App /> */}
            </BrowserRouter>
        </Container>
    </>
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
