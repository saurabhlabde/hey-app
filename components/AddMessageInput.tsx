import * as React from "react";
import { View, TextField, TouchableOpacity } from "react-native-ui-lib";
import {
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Icon } from "react-native-eva-icons";
import { useMutation } from "@apollo/client";
import { cache } from "../apollo/config";

// component
import { ReplyMessageInputCard } from "./ReplyMessageInputCard";

// gql
import { CREATE_MESSAGE } from "../graphql/main/createMessage";
import { MESSAGES } from "../graphql/main/messages";

// type
import { IMessage } from "./MessageCard";

interface IAddMessageInput {
  roomId: number;
  messageReplyId: number | null;
  activeUserId: number;
  setReplyMessageId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AddMessageInput: React.FC<IAddMessageInput> = ({
  roomId,
  messageReplyId,
  activeUserId,
  setReplyMessageId,
}) => {
  const [text, setText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [replyMessage, setReplyMessage] = React.useState<IMessage | null>(null);

  const [
    createMessageHandel,
    {
      data: createMessageData,
      loading: createMessageLoading,
      error: createMessageError,
    },
  ] = useMutation(CREATE_MESSAGE, {
    variables: {
      content: text,
      image: null,
      chatRoomId: roomId,
      messageReplyId: messageReplyId,
    },
  });

  // loading
  React.useEffect(() => {
    const loading = createMessageLoading;

    setIsLoading(loading);
  }, [createMessageLoading]);

  // add message data
  React.useEffect(() => {
    if (createMessageData) {
      setText("");
      setReplyMessageId(null);
      setReplyMessage(null);
    }
  }, [createMessageData]);

  // reply message
  React.useEffect(() => {
    if (messageReplyId) {
      const messageData: any = cache.readQuery({
        query: MESSAGES,
        variables: {
          roomId: roomId,
        },
      });
      const replyMessageData = messageData?.getMessages?.find(
        (mes: IMessage) => {
          return mes.id === messageReplyId;
        }
      );

      return setReplyMessage(replyMessageData);
    }
  }, [messageReplyId]);

  const addMessageHandel = () => {
    if (text?.trim() !== "") {
      return createMessageHandel();
    }
  };

  const handelReplyMessageClose = () => {
    setReplyMessageId(null);
    return setReplyMessage(null);
  };

  const isMe = replyMessage?.User?.id === activeUserId;

  return (
    <KeyboardAvoidingView style={[styles.cardMessage]}>
      <View style={[replyMessage && styles.cardMessageTop]}>
        {replyMessage && (
          <ReplyMessageInputCard
            props={replyMessage}
            onClose={handelReplyMessageClose}
            isMe={isMe}
          />
        )}
      </View>
      <View style={[styles.cardMessageBottom, styles.card]}>
        <View style={[styles.cardLeft, styles.card]}>
          <View style={[styles.buttonAddMedia]}>
            <Icon
              name={"plus-circle"}
              width={35}
              height={35}
              fill={"#3366FF"}
            />
          </View>

          <View style={[styles.card, styles.cardAddMessage]}>
            <TextField
              placeholder="Type something"
              style={[styles.inputAddMessage]}
              hideUnderline={true}
              value={text}
              onChangeText={setText}
            />
          </View>
        </View>

        <View style={[styles.cardRight]}>
          <TouchableOpacity activeOpacity={0.8} onPress={addMessageHandel}>
            <View style={[styles.buttonAdd]}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Icon
                  name={"rewind-right"}
                  width={30}
                  height={30}
                  fill={"#ffffff"}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessage: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  cardMessageTop: {
    height: "auto",
    width: "100%",
    paddingLeft: 8,
    paddingRight: 8,
  },

  cardMessageBottom: {
    height: 50,
    paddingLeft: 8,
    paddingRight: 8,
  },

  cardLeft: {
    borderRadius: 50,
    paddingTop: 6,
    justifyContent: "space-between",
    flex: 1,
  },

  cardRight: {
    alignItems: "center",
    justifyContent: "center",
  },

  cardAddMessage: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 4,
  },

  inputAddMessage: {
    fontSize: 17,
    fontWeight: "500",
  },

  buttonAddMedia: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonAdd: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0044ff",
    overflow: "hidden",
    marginRight: 5,
  },
});
