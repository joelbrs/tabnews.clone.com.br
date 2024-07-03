import { graphql } from "relay-runtime";

export const GetPostsQuery = graphql`
  query getPostsQuery($page: Int, $limit: Int) {
    edges {
      node {
        title
        slug
        tabcoins
        createdAt
      }
    }
  }
`;
