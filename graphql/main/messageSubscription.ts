import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription GetMessageSubscription($roomId: Float!) {
    getMessageSubscription(message: { roomId: $roomId }) {
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
