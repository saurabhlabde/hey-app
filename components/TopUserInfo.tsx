import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View, TouchableOpacity } from "react-native-ui-lib";

interface ITopUserInfo {
  navigation: any;
  props: {
    id: number;
    firstname: string;
    lastname: string;
    profileImage: string;
  };
  isOnline: string | null;
}

export const TopUserInfo: React.FC<ITopUserInfo> = ({
  navigation,
  props,
  isOnline,
}) => {
  const { id, firstname, lastname, profileImage } = props;

  return (
    <View style={[styles.card, styles.userCard]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          return navigation.goBack();
        }}
      >
        <View style={styles.cardBackButton}>
          <Icon
            name={"arrow-back-outline"}
            width={26}
            height={26}
            fill={"#3366FF"}
          />
        </View>
      </TouchableOpacity>

      <View style={[styles.card, styles.cardInfo]}>
        <View style={[styles.card, styles.cardInfoLeft]}>
          <View style={styles.cardUserProfile}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                return navigation.navigate("Profile", {
                  userId: id,
                });
              }}
            >
              <Card.Image
                style={styles.userProfileImage}
                source={{
                  uri: profileImage
                    ? profileImage
                    : "https://cdn.dribbble.com/users/4107199/avatars/normal/7a8008f93bf0f9a6ef8412428753c17e.jpg?1589497766",
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.cardInfoRight]}>
            <View style={styles.cardUserInfo}>
              <Text style={styles.userInfoText}>
                {firstname} {lastname}
              </Text>
            </View>

            <View style={styles.cardUserStatus}>
              <Text style={styles.userStatusText}>{isOnline}</Text>
            </View>
          </View>
        </View>

        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  userCard: {
    backgroundColor: "#ffffff",
    padding: 10,
    paddingTop: 30,
    alignItems: "center",
    overflow: "hidden",
  },

  cardLeft: {},

  cardRight: {
    alignItems: "center",
  },

  cardBackButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 50,
  },

  cardInfo: {
    marginLeft: 5,
  },

  cardInfoLeft: {},

  cardInfoRight: {
    justifyContent: "center",
    marginLeft: 10,
  },

  cardUserProfile: {},

  cardUserInfo: {},

  cardUserStatus: {},

  userProfileImage: {
    height: 45,
    width: 45,
    borderRadius: 50,
    resizeMode: "cover",
  },

  userInfoText: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  userStatusText: {
    fontSize: 13,
    color: "#3366FF",
  },
});
