import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Text, View } from "react-native-ui-lib";

export const MessageCard = () => {
  return (
    <View style={styles.cardMessage}>
      <View style={styles.cardContent}>
        <Text style={styles.contentText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque earum
          labore voluptatibus
        </Text>
      </View>

      <View style={[styles.card, styles.cardBottom]}>
        <View style={styles.cardTime}>
          <Text style={styles.timeText}>12:26</Text>
        </View>

        <View style={styles.cardStatus}>
          <Icon
            name={"done-all-outline"}
            width={18}
            height={18}
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

  cardMessage: {
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    maxWidth: "80%",
    marginRight: "auto",
  },

  cardContent: {},

  cardBottom: {
    marginTop: 5,
    justifyContent: "flex-end",
    paddingRight: 10,
    alignItems: "center",
  },

  cardTime: {},

  cardStatus: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },

  contentText: {
    fontSize: 15,
    lineHeight: 21,
  },

  timeText: {
    fontSize: 10,
    color: "#807676",
    fontWeight: "bold",
  },
});
