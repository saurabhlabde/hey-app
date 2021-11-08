import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $content: String
    $image: String
    $chatRoomId: Float!
  ) {
    createMessage(
      createMessage: {
        content: $content
        image: $image
        chatRoomId: $chatRoomId
      }
    )
  }
`;
