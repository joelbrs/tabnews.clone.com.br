import { graphql } from "relay-runtime";

export const GetPostsQuery = graphql`
  query getPostsQuery($page: Int, $limit: Int, $slug: String) {
    GetPosts(page: $page, limit: $limit, slug: $slug) {
      edges {
        node {
          title
          slug
          tabcoins
          createdAt
          description
          user {
            username
          }
        }
      }
    }
  }
`;
