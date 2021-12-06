import { InMemoryCache, ApolloClient } from "@apollo/client/core"
import { createApolloProvider } from "@vue/apollo-option"

const cache = new InMemoryCache()

const client = new ApolloClient({
    cache: cache,
    uri: 'http://localhost:8000/graphql',
})

export const provider = createApolloProvider({
    defaultClient: client
})