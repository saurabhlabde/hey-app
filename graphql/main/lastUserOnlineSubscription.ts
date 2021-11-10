import { gql } from "@apollo/client";

export const LAST_USER_ONLINE_SUBSCRIPTION = gql`
  subscription {
    getUserLastOnlineSubscription {
      user {
        id
        lastOnlineAt
      }
    }
  }
`;
