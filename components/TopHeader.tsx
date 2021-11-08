import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View, TouchableOpacity } from "react-native-ui-lib";

interface ITopHeader {
  navigation: any;
  props: {
    id: number;
    firstname: string;
    lastname: string;
    profileImage: string;
  };
}

export const TopHeader: React.FC<ITopHeader> = ({ props, navigation }) => {
  const [message, setMessage] = React.useState<string>("");

  const { id, firstname, lastname, profileImage } = props;

  React.useEffect(() => {
    const showMessage = () => {
      const hours = new Date().getHours();

      if (hours >= 0 && hours < 12) {
        return setMessage("Good Morning");
      } else if (hours == 12) {
        return setMessage("Good Noon!");
      } else if (hours >= 12 && hours <= 17) {
        return setMessage("Good Afternoon");
      } else {
        return setMessage("Good Evening");
      }
    };

    showMessage();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.card1}>
        <View style={styles.card}>
          <View style={styles.card}>
            <View style={styles.imageCard}>
              <Card.Image
                style={styles.profileImage}
                source={{
                  uri: profileImage
                    ? profileImage
                    : "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
                }}
              />
            </View>

            <View style={styles.infoCard}>
              <View style={styles.messageCard}>
                <Text style={styles.messageText}>{message}</Text>
              </View>

              <View style={styles.userInfoCard}>
                <Text style={styles.userInfoText}>
                  {firstname} {lastname}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            return navigation?.navigate("Discover");
          }}
        >
          <View style={styles.searchCard}>
            <Icon name={"search"} width={28} height={28} fill={"#3366FF"} />
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
