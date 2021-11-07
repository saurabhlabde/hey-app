import { gql } from "@apollo/client";

export const USER = gql`
  query GetUser($id: Float) {
    getUser(user: { id: $id }) {
      id
      firstname
      lastname
      profileImage
    }
  }
`;
