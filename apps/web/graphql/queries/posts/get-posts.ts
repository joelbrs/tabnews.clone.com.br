import { graphql } from "relay-runtime";

export const GetPostsQuery = graphql`
  query getPostsQuery(
    $page: Int
    $limit: Int = 30
    $slug: String
    $relevants: Boolean = false
  ) {
    GetPosts(page: $page, limit: $limit, slug: $slug, relevants: $relevants) {
      pageInfo {
        hasNextPage
      }
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
