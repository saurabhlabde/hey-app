import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, View } from "react-native-ui-lib";

export const ChatUser = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        return navigation.navigate("ChatRoomPage");
      }}
    >
      <View style={[styles.chatCard, styles.card]}>
        <View style={styles.cardLeft}>
          <View style={styles.cardProfile}>
            <Card.Image
              style={styles.profileImage}
              source={{
                uri: "https://cdn.dribbble.com/users/78433/avatars/normal/305e1c98dca8c28213f093b08aed255b.png?1544179193",
              }}
            />
          </View>

          <View style={styles.cardActivity}></View>
        </View>

        <View style={styles.cardRight}>
          <View style={[styles.cardInfo, styles.card]}>
            <View style={styles.cardUserInfo}>
              <Text style={styles.userInfoText}>Jeroen Eerden</Text>
            </View>

            <View style={styles.cardMessageCount}>
              <Text style={styles.messageCountText}>5</Text>
            </View>
          </View>

          <View style={[styles.cardMessage, styles.card]}>
            <View style={styles.cardLastMessage}>
              <Text style={styles.lastMessageText}>ok no problem</Text>
            </View>

            <View style={styles.cardTiming}>
              <Text style={styles.messageTimeText}>Today 12:25</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  chatCard: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 9,
    paddingBottom: 9,
  },

  cardLeft: {
    justifyContent: "center",
  },

  cardRight: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
  },

  cardProfile: {},

  cardInfo: {
    justifyContent: "space-between",
  },

  cardMessage: {
    justifyContent: "space-between",
  },

  cardActivity: {},

  cardUserInfo: {},

  cardMessageCount: {
    height: 20,
    width: 20,
    backgroundColor: "#a79c60",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  cardLastMessage: {},

  cardTiming: {},

  profileImage: {
    height: 55,
    width: 55,
    borderRadius: 50,
    resizeMode: "cover",
  },

  userInfoText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  messageCountText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 11,
  },

  messageTimeText: {
    fontSize: 11,
    color: "#3a3939",
    fontWeight: "500",
  },

  lastMessageText: {
    fontSize: 15,
    color: "#3a3939",
    fontWeight: "500",
  },
});