import { gql } from '@apollo/client'

export const GET_USER_AND_POSTS = gql`
  fragment userAttributes on UsersPermissionsUser {
    name
    biography
    avatar {
      data {
        attributes {
          formats
        }
      }
    }
  }

  fragment userPosts on PostRelationResponseCollection {
    data {
      id
      attributes {
        title
        slug
        publishedAt
        content
        tags {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
        image {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }

  fragment userAndPostsFrag on UsersPermissionsUserEntityResponseCollection {
    data {
      id
      attributes {
        ...userAttributes
        posts(
          pagination: { limit: $postsLimit }
          sort: $postsSortBy
          publicationState: LIVE
        ) {
          ...userPosts
        }
      }
    }
  }

  query getUserAndPosts(
    $username: String!
    $postsLimit: Int!
    $postsSortBy: [String]
  ) {
    usersPermissionsUsers(filters: { username: { eq: $username } }) {
      ...userAndPostsFrag
    }
  }
`
