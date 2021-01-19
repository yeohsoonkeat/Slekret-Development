import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	concat,
	InMemoryCache,
} from '@apollo/client';
import { onError } from 'apollo-link-error';
import axios from 'axios';

export default function useApolloClientWithToken(token, authDispatch) {
	const httpLink = new HttpLink({
		uri: 'http://localhost:8080/v1/graphql',
	});

	const logoutLink = onError(({ graphQLErrors, networkError, forward }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ extensions }) => {
				if (extensions.code === 'invalid-jwt') {
					axios
						.get('http://localhost:8000/logout', {
							withCredentials: true,
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
								'Access-Control-Allow-Credentials': true,
							},
						})
						.then(() => {
							window.open('/authentication', '_self');
						});
					authDispatch({
						type: 'USER_LOGOUT',
					});
					window.localStorage.setItem('auth', 'false');
				}
			});
		}
		if (networkError && networkError.statusCode === 401) {
		}
	});

	const authMiddleware = new ApolloLink((operation, forward) => {
		if (token) {
			operation.setContext({
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		}
		return forward(operation);
	});

	const apolloClient = new ApolloClient({
		link: logoutLink.concat(concat(authMiddleware, httpLink)),
		cache: new InMemoryCache(),
	});
	return { apolloClient };
}
