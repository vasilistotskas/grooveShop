import { InMemoryCache, ApolloClient } from "@apollo/client/core"
import { createApolloProvider } from "@vue/apollo-option"

const cache = new InMemoryCache()

const client = new ApolloClient({
    cache: cache,
    uri: process.env.VUE_APP_GRAPHQL_URL
})

export const provider = createApolloProvider({
    defaultClient: client
})