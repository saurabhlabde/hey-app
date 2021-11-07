import { gql } from "@apollo/client";

export const CHATROOM = gql`
  query {
    getChatRoom {
      id
      user {
        id
        firstname
        lastname
        profileImage
      }
      chatRoom {
        id
        newMessages
        imageUrl
        name
        lastMessage {
          id
          userID
          content
          image
          status
          chatRoomID
          createdAtIso
          userId
        }
      }
    }
  }
`;
