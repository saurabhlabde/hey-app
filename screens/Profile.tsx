import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, View, Button } from "react-native-ui-lib";
import { useQuery } from "@apollo/client";

// gql
import { USER } from "../graphql/main/user";

export const ProfilePage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(USER, {
    variables: {
      id: null,
    },
  });

  React.useEffect(() => {
    const loading = userLoading;

    setIsLoading(loading);
  }, [userLoading]);

  if (isLoading) {
    return (
      <ActivityIndicator
        color="blue"
        size="large"
        style={{
          height: 100,
          width: 100,
        }}
      />
    );
  }

  const user = userData?.getUser;

  return (
    <SafeAreaView>
      <View style={styles.profile}>
        <View style={styles.cardProfile}>
          <Card.Image
            source={{
              uri: user?.profileImage
                ? user.profileImage
                : "https://cdn.dribbble.com/users/102849/avatars/normal/a51d3414ef390fead573391b9160f755.jpg?1481289442",
            }}
            style={styles.userProfileImage}
          />
        </View>

        <View style={styles.cardUserInfo}>
          <Text style={styles.userInfoText}>
            {user?.firstname} {user?.lastname}
          </Text>
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
