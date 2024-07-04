import { graphql } from "relay-runtime";

export const UpdateUserMutation = graphql`
  mutation updateUserMutation(
    $username: String
    $description: String
    $notify: Boolean
    $email: String
  ) {
    UpdateUser(
      input: {
        username: $username
        description: $description
        notify: $notify
        email: $email
      }
    ) {
      user {
        id
      }
    }
  }
`;
