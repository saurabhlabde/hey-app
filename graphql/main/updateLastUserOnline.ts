import { gql } from "@apollo/client";

export const UPDATE_LAST_USER_ONLINE = gql`
  mutation {
    updateUserLastOnline
  }
`;
