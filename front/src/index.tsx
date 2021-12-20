import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloProvider } from '@apollo/client';
import { Notifications } from './common/notifications/notifications';
import { RxContext, GlobalObservables } from './context/rx-context';
import { apolloClientFactory } from './core';

const apolloClientInstance = apolloClientFactory();
const globalObservables = new GlobalObservables();

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <RxContext.Provider value={globalObservables}>
      <ApolloProvider client={apolloClientInstance}>
        <App />
      </ApolloProvider>
    </RxContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
