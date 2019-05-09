import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "react-bootstrap";
import { Provider } from "react-redux";
import { createStore } from 'redux';

import Menu from './components/Menu';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';
import reducers from './reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <Menu />
        <Container role="main" style={{ paddingTop: 20 }}>
            <Routes />
        </Container>
    </Provider>  
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
