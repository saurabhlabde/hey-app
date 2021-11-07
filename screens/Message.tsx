import * as React from "react";
import { FlatList } from "react-native";
import { View } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";

// component
import { TopHeader } from "../components/TopHeader";
import { ChatUser } from "../components/ChatUser";

export const MessagePage = ({ navigation }: any) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SafeAreaView>
      <FlatList
        style={{
          backgroundColor: "#fbfbfb",
        }}
        data={data}
        renderItem={() => {
          return <ChatUser navigation={navigation} />;
        }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => {
          return <TopHeader />;
        }}
        ListFooterComponent={
          <View
            style={{
              height: 300,
              width: "100%",
            }}
          />
        }
      />
    </SafeAreaView>
  );
};
