import { graphql } from "relay-runtime";

export enum VoteTypeEnum {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

export const VotePostMutation = graphql`
  mutation votePostMutation($slug: String!, $type: VoteTypeEnum!) {
    VotePost(input: { slug: $slug, type: $type }) {
      post {
        tabcoins
      }
    }
  }
`;
