import * as React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { useQuery, useSubscription } from "@apollo/client";

// component
import { MessageCard } from "../components/MessageCard";
import { TopUserInfo } from "../components/TopUserInfo";
import { AddMessageInput } from "../components/AddMessageInput";
import { View } from "react-native-ui-lib";

// gql
import { USER } from "../graphql/main/user";
import { MESSAGES } from "../graphql/main/messages";
import { MESSAGE_SUBSCRIPTION } from "../graphql/main/messageSubscription";

import { cache } from "../apollo/config";

export const ChatRoomPage = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  const {
    data: messageSubscriptionData,
    loading: messageSubscriptionLoading,
    error: messageSubscriptionError,
  } = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      roomId: route?.params?.roomId,
    },
  });

  React.useEffect(() => {
    const loading = userLoading || messagesLoading;

    setIsLoading(loading);
  }, [userLoading, messagesLoading]);

  // message subscription data

  React.useEffect(() => {
    if (messageSubscriptionData?.getMessageSubscription) {
      const findMessageId = messages.find((mess: any) => {
        return mess.id === messageSubscriptionData?.getMessageSubscription?.id;
      });

      if (!findMessageId) {
        const data: any = cache.readQuery({
          query: MESSAGES,
          variables: {
            roomId: route?.params?.roomId,
          },
        });

        cache.writeQuery({
          query: MESSAGES,
          data: {
            getMessages: [
              messageSubscriptionData.getMessageSubscription,
              ...data.getMessages,
            ],
          },
          variables: {
            roomId: route?.params?.roomId,
          },
        });
      }
    }
  }, [messageSubscriptionData]);

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
  const messages = messagesData.getMessages;

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
        <AddMessageInput roomId={route?.params?.roomId} />
      </View>
    </>
  );
};
