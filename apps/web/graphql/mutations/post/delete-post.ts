import { graphql } from "relay-runtime";

export const DeletePostMutation = graphql`
  mutation deletePostMutation($slug: String!) {
    DeletePost(input: { slug: $slug }) {
      success
    }
  }
`;
