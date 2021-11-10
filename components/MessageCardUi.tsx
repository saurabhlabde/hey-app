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
  isMe: boolean;
}

export const MessageCardUi: React.FC<IMessageCard> = ({ props, isMe }) => {
  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    props;

  return (
    <View style={[styles.cardMessageOutSide]}>
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
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessageOutSide: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#fbfbfb",
  },

  cardMessage: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: "80%",
  },

  cardMessageForActiveUser: {
    marginLeft: "auto",
    marginRight: 10,
    backgroundColor: "#eeeeee",
    paddingLeft: 20,
    paddingRight: 10,
  },

  cardMessageForUser: {
    marginRight: "auto",
    marginLeft: 10,
    backgroundColor: "#33b4ff",
    paddingLeft: 10,
    paddingRight: 20,
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
