import { gql } from '@apollo/client'

export const GET_TAGS = gql`
  fragment TagGetTagsFrag on TagEntityResponseCollection {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }

  query getTags($tagsLimit: Int!) {
    tags(pagination: { limit: $tagsLimit }) {
      ...TagGetTagsFrag
    }
  }
`
