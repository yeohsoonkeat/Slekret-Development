import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import axios from 'axios';
import config from '../config';

export default function useApolloClientWithToken(token, authDispatch) {
  const httpLink = new HttpLink({
    uri: config.hasuraGraphql,
    headers: {
      Authorization: `Bearer ${token ? token : config.guestToken}`
    },
  });

  const logoutLink = onError(({ graphQLErrors, networkError, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        console.log(extensions)
        if (extensions.code === 'invalid-jwt') {
          axios
            .post(
              config.backendUrl + '/auth/logout',
              {},
              {
                withCredentials: true,
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Credentials': true,
                },
              }
            )
            .then(() => {
              window.open('/', '_self');
            });
          authDispatch({
            type: 'USER_LOGOUT',
          });
          window.localStorage.setItem('auth', 'false');
        }
      });
    }
    if (networkError && networkError.statusCode === 401)
      console.log('hello world');
  });

  // const authMiddleware = new ApolloLink((operation, forward) => {
  //   if (token) {
  //     operation.setContext({
  
  //     });
  //   }
  //   return forward(operation);
  // });

  const apolloClient = new ApolloClient({
    link:logoutLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return { apolloClient };
}
