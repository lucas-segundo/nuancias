import { gql } from '@apollo/client'
import { IMAGE_DATA_FRAG, USER_DATA_FRAG, TAG_DATA_FRAG } from '../fragments'

export const GET_POST_BY_SLUG = gql`
  ${IMAGE_DATA_FRAG}
  ${USER_DATA_FRAG}
  ${TAG_DATA_FRAG}

  query getPostBySlug($slug: String) {
    posts(filters: { slug: { eq: $slug } }, publicationState: LIVE) {
      data {
        id
        attributes {
          title
          content
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
