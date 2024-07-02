import { graphql } from "relay-runtime";

export const CreatePostMutation = graphql`
  mutation createPostMutation(
    $title: String!
    $description: String!
    $font: String
  ) {
    CreatePost(
      input: { title: $title, description: $description, font: $font }
    ) {
      post {
        id
      }
    }
  }
`;
