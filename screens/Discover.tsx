import * as React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";

// component
import { SearchInput } from "../components/SearchInput";
import { UserCard } from "../components/UserCard";

export const DiscoverPage = ({ navigation }: any) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <SafeAreaView>
      <FlatList
        style={{
          backgroundColor: "#fbfbfb",
          paddingTop: 50,
        }}
        data={data}
        renderItem={() => {
          return <UserCard />;
        }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => {
          return <SearchInput />;
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
