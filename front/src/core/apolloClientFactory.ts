import {
  ApolloClient,
  ApolloLink,
  split,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import Config from '../common/config';
import { getCurrentUser } from '../common/utils/getCurrentUser';
import { WebSocketLink } from '@apollo/client/link/ws';

export const apolloClientFactory = (): ApolloClient<NormalizedCacheObject> => {
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

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
};
