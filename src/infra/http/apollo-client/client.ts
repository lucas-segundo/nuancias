import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export const getApolloClient = (url: string) => {
  const httpLink = createHttpLink({
    uri: url,
  })

  const authLink = setContext((_, { headers, authToken }) => {
    const jwt = authToken || ''
    const authorization = jwt ? `Bearer ${jwt}` : headers?.authorization || ''

    return { headers: { ...headers, authorization } }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return client
}
