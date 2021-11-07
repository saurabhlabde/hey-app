import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View } from "react-native-ui-lib";

export const NotificationCard = () => {
  return (
    <View style={[styles.card, styles.cardNotification]}>
      <View style={styles.cardLeft}>
        <View style={styles.cardIcon}>
          <Icon
            name={"message-circle"}
            width={28}
            height={28}
            fill={"#3366FF"}
          />
        </View>
      </View>

      <View style={styles.cardRight}>
        <View style={[styles.card, styles.cardTop]}>
          <View style={styles.cardUserInfo}>
            <Text style={styles.userInfoText}>jack doe</Text>
          </View>

          <View style={styles.cardTime}>
            <Text style={styles.timeText}>15 min</Text>
          </View>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.cardMessage}>
            <Text style={styles.messageText}>love it not send me</Text>
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

  cardNotification: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },

  cardLeft: {},

  cardRight: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },

  cardIcon: {
    height: 60,
    width: 60,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ece7e797",
  },

  cardTop: {
    justifyContent: "space-between",
  },

  cardBottom: {},

  cardUserInfo: {},

  cardTime: {
    marginRight: 5,
  },

  cardMessage: {
    marginTop: 5,
  },

  userInfoText: {
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "capitalize",
  },

  timeText: {
    fontSize: 12,
    color: "#3a3939",
    fontWeight: "500",
  },

  messageText: {
    fontSize: 15,
  },
});
