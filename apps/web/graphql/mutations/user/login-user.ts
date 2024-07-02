import { graphql } from "react-relay";

export const LoginUserMutation = graphql`
  mutation loginUserMutation($email: String!, $password: String!) {
    LoginUser(input: { email: $email, password: $password }) {
      userId
      token
    }
  }
`;
