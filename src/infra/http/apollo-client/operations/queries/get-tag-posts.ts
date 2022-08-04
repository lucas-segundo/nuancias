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

  fragment UserFrag on UsersPermissionsUserEntityResponse {
    data {
      id
      attributes {
        username
        name
        biography
        avatar {
          ...ImageFrag
        }
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
        user {
          ...UserFrag
        }
      }
    }
  }

  fragment TagFrag on TagEntityResponseCollection {
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

  query getTagPosts($tagSlug: String!) {
    tags(filters: { slug: { eq: $tagSlug } }) {
      ...TagFrag
    }
  }
`
