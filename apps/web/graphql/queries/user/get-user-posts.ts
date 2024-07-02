import { graphql } from "relay-runtime";

export const GetUserPostsQuery = graphql`
  query getUserPostsQuery($username: String) {
    GetUser(username: $username) {
      edges {
        node {
          username
          posts {
            id
            title
            slug
            createdAt
          }
        }
      }
    }
  }
`;
