import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { CurrentUser } from './types/user';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import Config from './common/config';
import { Notifications } from './common/notifications/notifications';

export function getCurrentUser(): CurrentUser | null {
  const userJson = localStorage.getItem('currentUser');
  if (typeof userJson === 'string') {
    const user = JSON.parse(userJson);
    return user;
  }
  return null;
}


function getInitialState(user: CurrentUser | null): { [key: string]: any } {
  return {
    sidebar: true,
    currentUser: user,
    products: []
  };
}

const initialState = getInitialState(getCurrentUser());


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOOGLE':
      return { ...state, sidebar: !state.sidebar };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT_USER':
      return { ...state, currentUser: action.payload };
    case 'GET_PRODUCTS':
      return { ...state, products: action.payload };
    default: return state;
  }
};


const store = createStore<any, any, any, any>(rootReducer, applyMiddleware(thunk));


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


ReactDOM.render(
  <React.StrictMode>
    <Notifications />
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
