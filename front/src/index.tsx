import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  split,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import Config from './common/config';
import { Notifications } from './common/notifications/notifications';
import { getCurrentUser } from './common/utils/getCurrentUser';
import { RxContext, GlobalObservables } from './context/rx-context';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({ uri: Config.graphQlUrl });
const wsLink = new WebSocketLink({
  uri: Config.graphQlSubscriptionsUrl,
  options: {
    reconnect: true,
  },
});

const middlewareLink = new ApolloLink((operation, forward) => {
  const user = getCurrentUser();
  if (user) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
  }
  return forward(operation);
});

const link = middlewareLink.concat(httpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
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
