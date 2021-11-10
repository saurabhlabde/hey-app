import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View } from "react-native-ui-lib";
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from "@apollo/client";

interface IMessageCard {
  props: {
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
  };
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
  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    props;

  React.useEffect(() => {
    setIsMe(activeUserId === User?.id);
  }, [activeUserId]);

  React.useEffect(() => {
    updateReadHandel();
  }, [isMe, props]);

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
    <View
      style={[
        styles.cardMessage,
        isMe ? styles.cardMessageForActiveUser : styles.cardMessageForUser,
      ]}
    >
      {content && (
        <View style={styles.cardContent}>
          <Text
            style={[
              styles.contentText,
              {
                color: isMe ? "#000000" : "#ffffff",
              },
            ]}
          >
            {content}
          </Text>
        </View>
      )}

      <View style={[styles.card, styles.cardBottom]}>
        <View style={styles.cardTime}>
          <Text
            style={[
              styles.timeText,
              {
                color: isMe ? "#807676" : "#f5f0f0",
              },
            ]}
          >
            12:26
          </Text>
        </View>

        {isMe && (
          <View style={styles.cardStatus}>
            {status === "SEND" ? (
              <Icon
                name={"checkmark-outline"}
                width={18}
                height={18}
                fill={"#3c3e46"}
              />
            ) : status === "DELIVERED" ? (
              <Icon
                name={"done-all-outline"}
                width={18}
                height={18}
                fill={"#3c3e46"}
              />
            ) : status === "READ" ? (
              <Icon
                name={"done-all-outline"}
                width={18}
                height={18}
                fill={"#3366FF"}
              />
            ) : null}
          </View>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessage: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    maxWidth: "80%",
  },

  cardMessageForActiveUser: {
    marginLeft: "auto",
    marginRight: 10,
    backgroundColor: "#eeeeee",
  },

  cardMessageForUser: {
    marginRight: "auto",
    marginLeft: 10,
    backgroundColor: "#33b4ff",
  },

  cardContent: {},

  cardBottom: {
    marginTop: 5,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  cardTime: {},

  cardStatus: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },

  contentText: {
    fontSize: 15,
    lineHeight: 21,
  },

  timeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
