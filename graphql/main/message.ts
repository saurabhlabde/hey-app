import { gql } from "@apollo/client";

export const MESSAGE = gql`
  query GetMessage($messageId: Float!) {
    getMessage(message: { messageId: $messageId }) {
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
  }
`;
