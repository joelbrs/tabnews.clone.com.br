import { graphql } from "react-relay";

export const LoginUserMutation = graphql`
  mutation loginUserMutation($username: String!, $password: String!) {
    LoginUser(input: { username: $username, password: $password }) {
      userId
    }
  }
`;
