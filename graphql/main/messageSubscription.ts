import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    getMessageSubscription {
      message {
        id
        content
        image
        status
        chatRoomID
        replyToMessageID
        User {
          id
          firstname
          lastname
          profileImage
        }
      }
      type
    }
  }
`;
