import { gql } from '@apollo/client'

export const mockQueryDocumentNode = () => gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`
