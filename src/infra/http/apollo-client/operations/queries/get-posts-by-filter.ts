import { gql } from '@apollo/client'
import { IMAGE_DATA_FRAG, TAG_DATA_FRAG, USER_DATA_FRAG } from '../fragments'

export const GET_POSTS_BY_FILTER = gql`
  ${IMAGE_DATA_FRAG}
  ${USER_DATA_FRAG}
  ${TAG_DATA_FRAG}

  query getPostsByFilter($limit: Int, $sortBy: [String]) {
    posts(
      pagination: { limit: $limit }
      publicationState: LIVE
      sort: $sortBy
    ) {
      data {
        id
        attributes {
          title
          content
          slug
          publishedAt
          image {
            ...ImageDataFrag
          }
          user {
            ...UserDataFrag
          }
          tags {
            ...TagDataFrag
          }
        }
      }
    }
  }
`
