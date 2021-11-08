import { gql } from "@apollo/client";

export const CHECK_CHAT_ROOM = gql`
  query CheckRoomUser($userId: Float!) {
    checkRoomUser(checkRoomUser: { userId: $userId }) {
      isValid
      chatRoomId
      userId
    }
  }
`;
