import fetch from 'cross-fetch'
import { createApolloProvider } from '@vue/apollo-option'
import { InMemoryCache, ApolloClient, HttpLink } from '@apollo/client/core'

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
  link: new HttpLink({ uri: process.env.VITE_APP_GRAPHQL_URL, fetch }),
})

export const provider = createApolloProvider({
  defaultClient: clientApollo,
})
