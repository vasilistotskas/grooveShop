import { createApolloProvider } from '@vue/apollo-option'
import { InMemoryCache, ApolloClient } from '@apollo/client/core'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        fetchAllPostsFromRemote: {
          merge: true,
        },
        fetchPostBySlugFromRemote: {
          merge: true,
        },
      },
    },
  },
})

export const clientApollo = new ApolloClient({
  cache: cache,
  uri: process.env.VITE_APP_GRAPHQL_URL,
})

export const provider = createApolloProvider({
  defaultClient: clientApollo,
})
