import { gql } from "@apollo/client";

export const USERS = gql`
  query GetUsers($type: String) {
    getUsers(users: { type: $type }) {
      id
      firstname
      lastname
      profileImage
    }
  }
`;
