import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory'
import 'cross-fetch/polyfill'

export function githubClient(
  token: string
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `token ${token}`
      }
    }),
    cache: new InMemoryCache()
  })
}
