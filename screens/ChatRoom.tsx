import * as React from "react";
import { FlatList } from "react-native";

// component
import { MessageCard } from "../components/MessageCard";
import { TopUserInfo } from "../components/TopUserInfo";
import { AddMessageInput } from "../components/AddMessageInput";
import { View } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";

export const ChatRoomPage = ({ navigation }: any) => {
  const data = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

  return (
    <>
      <TopUserInfo navigation={navigation} />
      <FlatList
        style={{
          position: "relative",
          backgroundColor: "#fbfbfb",
        }}
        data={data}
        renderItem={() => {
          return <MessageCard />;
        }}
        inverted
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: 100,
                width: "100%",
              }}
            />
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
          backgroundColor: "#ffffff",
        }}
      >
        <AddMessageInput />
      </View>
    </>
  );
};
