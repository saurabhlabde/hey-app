import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View, TouchableOpacity } from "react-native-ui-lib";

interface IUserCard {
  props: {
    id: number;
    firstname: string;
    lastname: string;
    profileImage: string;
  };
  clickHandel: (userId: number) => void;
}

export const UserCard: React.FC<IUserCard> = ({ props, clickHandel }) => {
  const { id, firstname, lastname, profileImage } = props;

  return (
    <View style={[styles.card, styles.cardUser]}>
      <View style={styles.cardLeft}>
        <View style={styles.cardUserProfile}>
          <Card.Image
            source={{
              uri: profileImage
                ? profileImage
                : "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
            }}
            style={styles.userProfileImage}
          />
        </View>
      </View>

      <View style={[styles.cardRight, styles.card]}>
        <View style={styles.cardUserInfo}>
          <Text style={styles.userInfoText}>
            {firstname} {lastname}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            return clickHandel(id);
          }}
        >
          <View style={styles.cardMessageIcon}>
            <Icon
              name={"message-circle"}
              width={20}
              height={20}
              fill={"#3366FF"}
            />
          </View>
        </TouchableOpacity>
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
    paddingTop: 10,
    paddingBottom: 10,
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

  cardUserInfo: {
    justifyContent: "center",
  },

  cardMessageIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1ebeb",
    height: 40,
    width: 40,
    borderRadius: 50,
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
