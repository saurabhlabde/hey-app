import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(login: { email: $email, password: $password }) {
      token
    }
  }
`;
