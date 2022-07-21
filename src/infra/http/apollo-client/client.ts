import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_CMS_API_URL + '/graphql',
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

export default client
