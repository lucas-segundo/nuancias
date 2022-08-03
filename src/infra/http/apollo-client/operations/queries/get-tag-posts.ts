import { gql } from '@apollo/client'

export const GET_TAG_POSTS = gql`
  fragment ImageFrag on UploadFileEntityResponse {
    data {
      id
      attributes {
        formats
      }
    }
  }

  fragment PostsFrag on PostRelationResponseCollection {
    data {
      id
      attributes {
        title
        slug
        content
        publishedAt
        image {
          ...ImageFrag
        }
      }
    }
  }

  fragment TagFrag on TagEntityResponse {
    data {
      id
      attributes {
        title
        slug
        posts {
          ...PostsFrag
        }
      }
    }
  }

  query getTagPosts($tagId: ID!) {
    tag(id: $tagId) {
      ...TagFrag
    }
  }
`
