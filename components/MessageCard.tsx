import * as React from "react";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useQuery,
} from "@apollo/client";

// component
import { MessageCardUi } from "./MessageCardUi";
import { ReplyMessageCardUi } from "./ReplyMessageCardUi";

// gql
import { MESSAGE } from "../graphql/main/message";

export interface IMessage {
  id: number;
  User: {
    id: number | null;
    firstname: string | null;
    lastname: string | null;
    profileImage: string | null;
  };
  chatRoomID: number;
  content: string | null;
  image: string | null;
  replyToMessageID: string | null;
  status: string;
}

interface IMessageCard {
  props: IMessage;
  activeUserId: number;
  messageUpdateStatusHandel: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>;
}

export const MessageCard: React.FC<IMessageCard> = ({
  props,
  activeUserId,
  messageUpdateStatusHandel,
}) => {
  const [isMe, setIsMe] = React.useState<boolean | null>(null);
  const [replyTo, setReplyTo] = React.useState<IMessage | null>(null);
  const [replyMessageId, setReplyMessageId] = React.useState<number | null>(
    null
  );

  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    props;

  const {
    data: messageData,
    loading: messageLoading,
    error: messageError,
    refetch: messageRefetch,
  } = useQuery(MESSAGE, {
    variables: {
      messageId: replyMessageId,
    },
  });

  // check is me
  React.useEffect(() => {
    setIsMe(activeUserId === User?.id);
  }, [activeUserId]);

  // message read state update
  React.useEffect(() => {
    if (isMe && props) {
      updateReadHandel();
    }
  }, [isMe, props]);

  // message data
  React.useEffect(() => {
    if (messageData && messageData.getMessage) {
      return setReplyTo(messageData?.getMessage);
    }
  }, [messageData]);

  // check reply id
  React.useEffect(() => {
    if (props && props.replyToMessageID) {
      setReplyMessageId(+props.replyToMessageID);
      messageRefetch();
    }
  }, [props]);

  const updateReadHandel = () => {
    if (isMe === false && status !== "READ") {
      return messageUpdateStatusHandel({
        variables: {
          messageId: id,
          type: "READ",
        },
      });
    }
  };

  return (
    <>
      {replyTo ? (
        <ReplyMessageCardUi
          isMe={isMe ? true : false}
          messageProps={props}
          replyProps={replyTo}
        />
      ) : (
        <MessageCardUi isMe={isMe ? true : false} props={props} />
      )}
    </>
  );
};
