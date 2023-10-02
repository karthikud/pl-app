import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:8080/graphql',
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(  
  document.getElementById('root') as HTMLElement
);

root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

