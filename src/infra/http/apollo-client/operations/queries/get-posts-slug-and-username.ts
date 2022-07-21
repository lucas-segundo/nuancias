import { gql } from '@apollo/client'

export const GET_POSTS_SLUG_AND_USERNAME = gql`
  query getPostsSlugAndUsername($limit: Int!) {
    posts(pagination: { limit: $limit }, publicationState: LIVE) {
      data {
        id
        attributes {
          slug
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`
