import { gql } from "@apollo/client";

export const CREATE_CHAT_ROOM = gql`
  mutation CreateChatRoom($userId: Float!) {
    createChatRoom(createRoom: { userId: $userId }) {
      id
      chatRoomId
      userId
    }
  }
`;
