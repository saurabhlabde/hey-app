import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register(
    $firstname: String!
    $lastname: String!
    $email: String!
    $profileImage: String!
    $password: String!
  ) {
    register(
      register: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        profileImage: $profileImage
      }
    ) {
      token
    }
  }
`;
