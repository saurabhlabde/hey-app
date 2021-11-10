import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View, Image, TouchableOpacity } from "react-native-ui-lib";

// type
import { IMessage } from "./MessageCard";

interface IReplyMessageCard {
  props: IMessage;
  isMe: boolean;
  onClose?: () => void;
  hideCloseButton: boolean;
}

export const ReplyMessageInputCard: React.FC<IReplyMessageCard> = ({
  props,
  onClose,
  isMe,
  hideCloseButton,
}) => {
  const { User, chatRoomID, content, id, image, replyToMessageID, status } =
    props;

  return (
    <View style={[styles.cardMessage]}>
      {!hideCloseButton && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={styles.closeButtonTouchableOpacity}
        >
          <View style={styles.closeButton} pointerEvents="none">
            <Icon
              name={"close-outline"}
              width={18}
              height={18}
              fill={"#3366FF"}
            />
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.cardInfo}>
        <Text style={styles.infoText}>
          Reply to {isMe ? "you" : `${User.firstname} ${User.lastname}`}
        </Text>
      </View>

      <View style={[styles.card, styles.cardContent]}>
        <View style={styles.cardContentText}>
          <Text style={styles.contentText}>{content}</Text>
        </View>

        {image && image.trim() !== "" && (
          <View style={styles.cardContentMedia}>
            <Image
              style={styles.infoMedia}
              source={{
                uri: image,
              }}
            />
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
    backgroundColor: "#319fe9",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: "center",
    position: "relative",
  },

  cardLeft: {},

  cardRight: {},

  cardInfo: {},

  cardContent: {},

  cardContentText: {},

  cardContentMedia: {
    height: 40,
    width: 40,
  },

  infoMedia: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },

  infoText: {
    color: "#f3eaea",
    fontSize: 13,
  },

  contentText: {
    color: "#ffffff",
    fontSize: 16,
  },

  closeButton: {
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButtonTouchableOpacity: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 25,
    width: 25,
    zIndex: 1,
  },
});
