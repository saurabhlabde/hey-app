import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View } from "react-native-ui-lib";

interface IMessageCard {
  props: {
    id: number;
    User: any;
    chatRoomID: number;
    content: string | null;
    image: string | null;
    replyToMessageID: string | null;
    status: string;
  };
}

export const MessageCard: React.FC<IMessageCard> = ({ props }) => {
  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    props;

  return (
    <View style={styles.cardMessage}>
      {content && (
        <View style={styles.cardContent}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}

      <View style={[styles.card, styles.cardBottom]}>
        <View style={styles.cardTime}>
          <Text style={styles.timeText}>12:26</Text>
        </View>

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
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessage: {
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    maxWidth: "80%",
    marginRight: "auto",
  },

  cardContent: {},

  cardBottom: {
    marginTop: 5,
    justifyContent: "flex-end",
    paddingRight: 10,
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
    color: "#807676",
    fontWeight: "bold",
  },
});
