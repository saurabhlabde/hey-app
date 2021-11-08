import * as React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";

// component
import { MessageCard } from "../components/MessageCard";
import { TopUserInfo } from "../components/TopUserInfo";
import { AddMessageInput } from "../components/AddMessageInput";
import { View } from "react-native-ui-lib";

// gql
import { USER } from "../graphql/main/user";
import { MESSAGES } from "../graphql/main/messages";

export const ChatRoomPage = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [messages, setMessages] = React.useState<Array<any>>([]);

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(USER, {
    variables: {
      id: route?.params?.userId,
    },
  });

  const {
    data: messagesData,
    loading: messagesLoading,
    error: messagesError,
  } = useQuery(MESSAGES, {
    variables: {
      roomId: route?.params?.roomId,
    },
  });

  React.useEffect(() => {
    const loading = userLoading || messagesLoading;

    setIsLoading(loading);
  }, [userLoading, messagesLoading]);

  React.useEffect(() => {
    if (messagesData) {
      setMessages([...messagesData.getMessages]);
    }
  }, [messagesData]);

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

  const userInfo = userData?.getUser;

  return (
    <>
      <TopUserInfo navigation={navigation} props={userInfo} />
      <FlatList
        style={{
          position: "relative",
          backgroundColor: "#fbfbfb",
        }}
        data={messages}
        renderItem={(item) => {
          return <MessageCard props={item.item} />;
        }}
        inverted
        keyExtractor={(item) => item.id.toString()}
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
