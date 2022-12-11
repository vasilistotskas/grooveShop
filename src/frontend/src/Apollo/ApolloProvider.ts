import { createApolloProvider } from '@vue/apollo-option'
import { InMemoryCache, ApolloClient } from '@apollo/client/core/core.cjs'

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				fetchPostsFromRemote: {
					merge: true
				},
				fetchPostBySlugFromRemote: {
					merge: true
				}
			}
		}
	}
})

export const clientApollo = new ApolloClient({
	cache: cache,
	uri: process.env.VITE_APP_GRAPHQL_URL
})

export const provider = createApolloProvider({
	defaultClient: clientApollo
})
