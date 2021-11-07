import * as React from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "react-native-ui-lib";

interface IButton {
  title: string;
  onPress: () => void;
}

export const Btn: React.FC<IButton> = ({ title, onPress }) => {
  return (
    <Button
      backgroundColor="#0062ff"
      label={title ? title : "Click"}
      labelStyle={{ fontWeight: "600", fontSize: 17 }}
      enableShadow
      activeOpacity={0.8}
      borderRadius={20}
      style={styles.button}
      onPress={onPress}
    />
  );
};

export const styles = StyleSheet.create({
  button: {
    height: 55,
  },
});
