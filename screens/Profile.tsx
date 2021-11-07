import * as React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, View, Button } from "react-native-ui-lib";

export const ProfilePage = () => {
  return (
    <SafeAreaView>
      <View style={styles.profile}>
        <View style={styles.cardProfile}>
          <Card.Image
            source={{
              uri: "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
            }}
            style={styles.userProfileImage}
          />
        </View>

        <View style={styles.cardUserInfo}>
          <Text style={styles.userInfoText}>alex bender</Text>
        </View>

        <View style={styles.cardButton}>
          <Button
            backgroundColor="#0062ff"
            label="Message"
            labelStyle={{ fontWeight: "600", fontSize: 17 }}
            enableShadow
            activeOpacity={0.8}
            style={styles.messageButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  profile: {
    backgroundColor: "#fbfbfb",
    height: "100%",
    width: "100%",
    paddingTop: 100,
  },

  cardProfile: {
    alignItems: "center",
  },

  cardUserInfo: {
    alignItems: "center",
    marginTop: 25,
  },

  cardButton: {
    alignItems: "center",
    marginTop: 50,
  },

  messageButton: {
    height: 50,
    width: "80%",
    borderRadius: 50,
    fontSize: 25,
  },

  userProfileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },

  userInfoText: {
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
