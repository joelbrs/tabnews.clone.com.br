import { graphql } from "relay-runtime";

export const UpdatePostMutation = graphql`
  mutation updatePostMutation(
    $title: String!
    $description: String!
    $font: String
    $slug: String!
  ) {
    UpdatePost(
      input: {
        title: $title
        description: $description
        font: $font
        slug: $slug
      }
    ) {
      post {
        id
      }
    }
  }
`;
