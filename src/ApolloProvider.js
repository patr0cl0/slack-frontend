import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import React from 'react';
import { ApolloProvider } from 'react-apollo';

const httpLink = createHttpLink({ uri: 'http://localhost:8000/graphql' });

const afterwareLink = new ApolloLink((operation, forward) => forward(operation)
  .map((response) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    console.log(headers);
    if (headers && headers.token && headers['refresh-token']) {
      localStorage.setItem('token');
      localStorage.setItem('refreshToken');
    }

    return response;
  }));

const middlewareLink = setContext(() => ({
  headers: {
    token: localStorage.getItem('token'),
    'refresh-token': localStorage.getItem('refreshToken'),
  },
}));

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// eslint-disable-next-line react/prop-types
export default ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);
