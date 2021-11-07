import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View, TextField } from "react-native-ui-lib";

export const UserCard = () => {
  return (
    <View style={[styles.card, styles.cardUser]}>
      <View style={styles.cardLeft}>
        <View style={styles.cardUserProfile}>
          <Card.Image
            source={{
              uri: "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
            }}
            style={styles.userProfileImage}
          />
        </View>
      </View>

      <View style={[styles.cardRight, styles.card]}>
        <View style={styles.cardUserInfo}>
          <Text style={styles.userInfoText}>jack dor</Text>
        </View>
        <View style={styles.cardMessageIcon}>
          <Icon
            name={"message-circle"}
            width={20}
            height={20}
            fill={"#3366FF"}
          />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardUser: {
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 20,
  },

  cardLeft: {},

  cardRight: {
    marginLeft: 10,
    justifyContent: "space-between",
    flex: 1,
  },

  cardUserProfile: {},

  cardUserInfo: {},

  cardMessageIcon: {
    alignItems: "center",
    justifyContent: "center",
  },

  userProfileImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    resizeMode: "cover",
  },

  userInfoText: {
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});
