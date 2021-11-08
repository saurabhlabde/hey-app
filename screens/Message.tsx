import * as React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";

// component
import { TopHeader } from "../components/TopHeader";
import { ChatUser } from "../components/ChatUser";

// gql
import { USER } from "../graphql/main/user";
import { CHAT_ROOM } from "../graphql/main/chatRooms";

export const MessagePage = ({ navigation }: any) => {
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

  const {
    data: chatRoomData,
    loading: chatRoomLoading,
    error: chatRoomError,
  } = useQuery(CHAT_ROOM);

  React.useEffect(() => {
    const loading = userLoading || chatRoomLoading;

    setIsLoading(loading);
  }, [userLoading, chatRoomLoading]);

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

  const topHeaderData = userData?.getUser;
  const roomData = chatRoomData?.getChatRoom;

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <FlatList
        style={{
          backgroundColor: "#fbfbfb",
        }}
        data={roomData ? roomData : []}
        renderItem={(item) => {
          return <ChatUser navigation={navigation} props={item.item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => {
          return <TopHeader props={topHeaderData} navigation={navigation} />;
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
