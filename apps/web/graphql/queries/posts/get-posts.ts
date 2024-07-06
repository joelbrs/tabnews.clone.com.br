import { graphql } from "relay-runtime";
import { User } from "../../../hooks";

type PostCreator = Pick<User, "id" | "username">;

export interface Post {
  title: string;
  slug: string;
  tabcoins: number;
  description: string;
  user: PostCreator;
  font?: string;
}

export const GetPostsQuery = graphql`
  query getPostsQuery(
    $page: Int = 0
    $limit: Int = 10
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
          font
          user {
            id
            username
          }
        }
      }
    }
  }
`;
