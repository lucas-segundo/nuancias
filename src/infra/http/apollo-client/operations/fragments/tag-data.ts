import { gql } from '@apollo/client'

export const TAG_DATA_FRAG = gql`
  fragment TagDataFrag on TagRelationResponseCollection {
    data {
      id
      attributes {
        title
        slug
      }
    }
  }
`
