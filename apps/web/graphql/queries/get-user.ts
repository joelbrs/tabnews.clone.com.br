import { graphql } from "relay-runtime";

export const GetUserQuery = graphql`
  query getUserQuery {
    GetUser {
      edges {
        node {
          id
          username
          email
          description
          tabcoins
          notify
        }
      }
    }
  }
`;
