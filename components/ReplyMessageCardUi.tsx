import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View } from "react-native-ui-lib";

// component
import { ReplyMessageInputCard } from "./ReplyMessageInputCard";

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

interface IReplyMessageCardUi {
  messageProps: IMessage;
  replyProps: IMessage;
  isMe: boolean;
}

export const ReplyMessageCardUi: React.FC<IReplyMessageCardUi> = ({
  messageProps,
  replyProps,
  isMe,
}) => {
  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    messageProps;

  return (
    <View style={styles.cardMessageOutSide}>
      <View
        style={[
          styles.cardMessageMain,
          isMe ? styles.cardMessageForActiveUser : styles.cardMessageForUser,
        ]}
      >
        <View style={styles.cardReplyTop}>
          <ReplyMessageInputCard
            isMe={isMe}
            props={replyProps}
            hideCloseButton={true}
          />
        </View>

        <View style={styles.cardReplyBottom}>
          <View style={styles.cardMessage}>
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
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessageOutSide: {
    backgroundColor: "#fbfbfb",
    marginBottom: 5,
    marginTop: 5,
  },

  cardMessageMain: {
    marginLeft: "auto",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    minWidth: "80%",
    backgroundColor: "#eeeeee",
  },

  cardReplyTop: {},

  cardReplyBottom: {
    flexDirection: "row",
  },

  cardMessage: {
    flex: 1,
  },

  cardMessageForActiveUser: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  cardMessageForUser: {
    marginRight: "auto",
    marginLeft: 10,
    backgroundColor: "#33b4ff",
    paddingLeft: 10,
    paddingRight: 10,
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
