import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './store/reducer';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { requestTransactionList } from './store/action/PaymentAction';
import { SagaWatcher } from './store/saga/SagaWatcher';

const middleware: Array<Middleware> = [];

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(SagaWatcher);

if (process.env.NODE_ENV !== 'production') {
    (window as any).store = store;
}

store.dispatch(requestTransactionList());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
