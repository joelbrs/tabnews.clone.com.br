import { graphql } from "relay-runtime";

export const CreateUserMutation = graphql`
  mutation createUserMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    CreateUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;
