import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View } from "react-native-ui-lib";

export const TopHeader = () => {
  return (
    <View style={styles.card}>
      <View style={styles.card1}>
        <View style={styles.card}>
          <View style={styles.card}>
            <View style={styles.imageCard}>
              <Card.Image
                style={styles.profileImage}
                source={{
                  uri: "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
                }}
              />
            </View>

            <View style={styles.infoCard}>
              <View style={styles.messageCard}>
                <Text style={styles.messageText}>good morning</Text>
              </View>

              <View style={styles.userInfoCard}>
                <Text style={styles.userInfoText}>alex bender</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.searchCard}>
          <Icon name={"search"} width={28} height={28} fill={"#3366FF"} />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  card1: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 15,
  },

  imageCard: {},

  profileImage: {
    height: 55,
    width: 55,
    borderRadius: 50,
    resizeMode: "cover",
  },

  infoCard: {
    marginLeft: 10,
    justifyContent: "center",
  },

  messageCard: {},

  userInfoCard: {
    marginTop: 2,
  },

  messageText: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#756969",
  },

  userInfoText: {
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "bold",
  },

  searchCard: {
    backgroundColor: "#f1ebeb",
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
