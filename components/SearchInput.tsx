import * as React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-eva-icons";
import { Card, Text, View, TextField } from "react-native-ui-lib";

interface ISearchInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput: React.FC<ISearchInput> = ({ value, setValue }) => {
  return (
    <View style={[styles.card, styles.cardSearch]}>
      <View style={styles.cardInput}>
        <TextField
          placeholder="Discover people"
          style={styles.searchInput}
          hideUnderline={true}
          value={value}
          onChangeText={setValue}
        />
      </View>

      <View style={styles.cardIcon}>
        <Icon name={"search"} width={26} height={26} fill={"#3366FF"} />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardSearch: {
    height: 50,
    backgroundColor: "#f6f0f0",
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 8,
    paddingLeft: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  cardInput: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 10,
  },

  cardIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },

  searchInput: {
    fontSize: 17,
    fontWeight: "500",
  },
});
