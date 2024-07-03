import { graphql } from "relay-runtime";

export const GetPostsQuery = graphql`
  query getPostsQuery($page: Int, $limit: Int) {
    GetPosts(page: $page, limit: $limit) {
      edges {
        node {
          title
          slug
          tabcoins
          createdAt
          user {
            username
          }
        }
      }
    }
  }
`;
