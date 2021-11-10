import { gql } from "@apollo/client";

export const MESSAGE_UPDATE_STATUS = gql`
  mutation UpdateMessageStatus($type: String!, $messageId: Float!) {
    updateMessageStatus(updateMessage: { type: $type, messageId: $messageId })
  }
`;
