import { gql } from '@apollo/client'

export const IMAGE_DATA_FRAG = gql`
  fragment ImageDataFrag on UploadFileEntityResponse {
    data {
      id
      attributes {
        formats
      }
    }
  }
`
