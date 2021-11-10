import * as React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

// component
import { TopHeader } from "../components/TopHeader";
import { ChatUser } from "../components/ChatUser";

// gql
import { USER } from "../graphql/main/user";
import { CHAT_ROOM } from "../graphql/main/chatRooms";
import { TOKEN_CHECK } from "../graphql/auth/tokenCheck";

export const MessagePage = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const {
    data: tokenCheckData,
    loading: tokenCheckLoading,
    error: tokenCheckError,
  } = useQuery(TOKEN_CHECK);

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
    const loading = userLoading || chatRoomLoading || tokenCheckLoading;

    setIsLoading(loading);
  }, [userLoading, chatRoomLoading, tokenCheckLoading]);

  React.useEffect(() => {
    if (!isLoading) {
      console.log(tokenCheckData?.tokenCheck, "tokenCheckData");
      if (!tokenCheckData?.tokenCheck) {
        navigation.navigate("LoginPage");
      }
    }
  }, [tokenCheckData]);

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
          return topHeaderData ? (
            <TopHeader props={topHeaderData} navigation={navigation} />
          ) : null;
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
