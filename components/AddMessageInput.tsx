import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { View, TextField } from "react-native-ui-lib";

export const AddMessageInput = () => {
  return (
    <View style={[styles.card, styles.cardMessageAdd]}>
      <View style={[styles.cardLeft, styles.card]}>
        <View style={[styles.buttonAddMedia]}>
          <Icon name={"plus-circle"} width={35} height={35} fill={"#3366FF"} />
        </View>

        <View style={[styles.card, styles.cardAddMessage]}>
          <TextField
            placeholder="Type something"
            style={[styles.inputAddMessage]}
            hideUnderline={true}
          />
        </View>

        <View style={[styles.buttonIcon]}>
          <Icon name={"smiling-face"} width={30} height={30} fill={"#3366FF"} />
        </View>
      </View>

      <View style={[styles.cardRight]}>
        <View style={[styles.buttonAdd]}>
          <Icon name={"rewind-right"} width={30} height={30} fill={"#ffffff"} />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessageAdd: {
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },

  cardLeft: {
    flex: 1,
    // backgroundColor: "#f3e7e7",
    borderRadius: 50,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    justifyContent: "space-between",
  },

  cardRight: {
    alignItems: "center",
    justifyContent: "center",
  },

  cardAddMessage: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
  },

  inputAddMessage: {
    fontSize: 17,
    fontWeight: "500",
  },

  buttonAddMedia: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonAdd: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0044ff",
    overflow: "hidden",
    marginRight: 5,
  },
});
