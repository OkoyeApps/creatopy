import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { ApolloProvider } from '@apollo/client/react';
import { store } from './store/store';
import { Provider } from 'react-redux';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URL,
});

const authLink = setContext((_, { headers }) => {
  let authState = store.getState() as any;
  let access_token = "";
  if (authState && authState.authentication && authState.authentication.access_token !== '') {
    access_token = authState.authentication.access_token;
  }

  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    }
  };
});

const client = new ApolloClient({
  link : authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>

      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
