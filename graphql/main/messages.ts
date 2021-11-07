import { gql } from "@apollo/client";

export const MESSAGES = gql`
  query GetMessages($roomId: Float!) {
    getMessages(messages: { roomId: $roomId }) {
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
