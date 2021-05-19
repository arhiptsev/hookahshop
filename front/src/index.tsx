import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Config from './common/config';
import { Notifications } from './common/notifications/notifications';
import { getCurrentUser } from './common/utils/getCurrentUser';
import { RxContext, GlobalObservables } from './context/rx-context';

const httpLink = new HttpLink({ uri: Config.graphQlUrl });
const middlewareLink = new ApolloLink((operation, forward) => {
  const user = getCurrentUser();
  if (user) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      }
    });
  }
  return forward(operation);
});
const link = middlewareLink.concat(httpLink);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const globalObservables = new GlobalObservables();

ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <RxContext.Provider value={globalObservables}>
      <ApolloProvider client={apolloClient}>
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
