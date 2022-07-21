import { gql } from '@apollo/client'
import { IMAGE_DATA_FRAG } from './image-data'

export const USER_DATA_FRAG = gql`
  ${IMAGE_DATA_FRAG}

  fragment UserDataFrag on UsersPermissionsUserEntityResponse {
    data {
      id
      attributes {
        name
        username
        biography
        avatar {
          ...ImageDataFrag
        }
      }
    }
  }
`
