import { gql } from "@apollo/client";

export const SEARCH = gql`
  query search($query: String!) {
    search(search: { query: $query }) {
      id
      firstname
      lastname
      profileImage
    }
  }
`;
