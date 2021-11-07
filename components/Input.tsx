import * as React from "react";
import { StyleSheet } from "react-native";
import { View, TextField } from "react-native-ui-lib";
import { TextInput } from "react-native";

interface IInput {
  placeholder?: string;
  marginTop?: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Input: React.FC<IInput> = ({
  placeholder,
  marginTop,
  value,
  setValue,
}) => {
  return (
    <View
      style={[
        styles.cardInput,
        {
          marginTop: marginTop ? marginTop : 15,
        },
      ]}
    >
      <TextField
        placeholder={placeholder ? placeholder : "Enter"}
        style={styles.input}
        hideUnderline={true}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  cardInput: {
    backgroundColor: "#f8f5f5",
    borderRadius: 20,
    height: 60,
  },

  input: {
    fontSize: 17,
    height: "100%",
    marginTop: 10,
    paddingLeft: 20,
  },
});
