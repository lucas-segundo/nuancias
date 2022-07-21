import { gql } from '@apollo/client'

export const GET_POSTS_BY_TEXT = gql`
  query getPostsByText($limit: Int, $sortBy: [String], $searchTo: String) {
    posts(
      pagination: { limit: $limit }
      publicationState: LIVE
      sort: $sortBy
      filters: {
        or: [
          { title: { contains: $searchTo } }
          { content: { contains: $searchTo } }
        ]
      }
    ) {
      data {
        id
        attributes {
          title
          slug
          user {
            data {
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
