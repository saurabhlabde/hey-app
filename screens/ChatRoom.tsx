import * as React from "react";
import { ActivityIndicator } from "react-native";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import moment from "moment";
import { SwipeListView } from "react-native-swipe-list-view";
import { Icon } from "react-native-eva-icons";

// component
import { MessageCard } from "../components/MessageCard";
import { TopUserInfo } from "../components/TopUserInfo";
import { AddMessageInput } from "../components/AddMessageInput";
import { View } from "react-native-ui-lib";

// gql
import { USER } from "../graphql/main/user";
import { MESSAGES } from "../graphql/main/messages";
import { MESSAGE_UPDATE_STATUS } from "../graphql/main/messageUpdateStatus";
import { UPDATE_LAST_USER_ONLINE } from "../graphql/main/updateLastUserOnline";
import { MESSAGE_SUBSCRIPTION } from "../graphql/main/messageSubscription";
import { LAST_USER_ONLINE_SUBSCRIPTION } from "../graphql/main/lastUserOnlineSubscription";

import { cache } from "../apollo/config";

export const ChatRoomPage = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [lastOnline, setLastOnline] = React.useState<number>(0);
  const [replyMessageId, setReplyMessageId] = React.useState<number | null>(
    null
  );

  const {
    data: activeUserData,
    loading: activeUserLoading,
    error: activeUserError,
  } = useQuery(USER, {
    variables: {
      id: null,
    },
  });

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

  const [
    messageUpdateStatusHandel,
    {
      data: messagesUpdateStatusData,
      loading: messagesUpdateStatusLoading,
      error: messagesUpdateStatusError,
    },
  ] = useMutation(MESSAGE_UPDATE_STATUS);

  const [
    userLastOnlineHandel,
    {
      data: userLastOnlineData,
      loading: userLastOnlineLoading,
      error: userLastOnlineError,
    },
  ] = useMutation(UPDATE_LAST_USER_ONLINE);

  const {
    data: messageSubscriptionData,
    loading: messageSubscriptionLoading,
    error: messageSubscriptionError,
  } = useSubscription(MESSAGE_SUBSCRIPTION);

  const {
    data: userLastOnlineSubscriptionData,
    loading: userLastOnlineSubscriptionLoading,
    error: userLastOnlineSubscriptionError,
  } = useSubscription(LAST_USER_ONLINE_SUBSCRIPTION);

  // loading

  React.useEffect(() => {
    const loading = userLoading || messagesLoading || activeUserLoading;

    setIsLoading(loading);
  }, [userLoading, messagesLoading, activeUserLoading]);

  // last online

  React.useEffect(() => {
    if (userData?.getUser) {
      const userLastOnline = userData?.getUser?.lastOnlineAt;

      setLastOnline(userLastOnline && +userLastOnline);
    }
  }, [userData]);

  // last online subscribe

  React.useEffect(() => {
    if (userLastOnlineSubscriptionData?.getUserLastOnlineSubscription) {
      const lastOnlineUser =
        userLastOnlineSubscriptionData?.getUserLastOnlineSubscription?.user;

      return setLastOnline(
        lastOnlineUser?.lastOnlineAt && +lastOnlineUser.lastOnlineUser
      );
    }
  }, [userLastOnlineSubscriptionData]);

  // check user online or not

  React.useEffect(() => {
    if (userData) {
      const interval = setInterval(() => {
        return (
          updateUserLastOnlineTextHandel && updateUserLastOnlineTextHandel()
        );
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [userData]);

  // message subscription data

  React.useEffect(() => {
    if (messageSubscriptionData?.getMessageSubscription) {
      const findMessageId = messages.find((mess: any) => {
        return (
          mess.id ===
          messageSubscriptionData?.getMessageSubscription?.message?.id
        );
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
              messageSubscriptionData.getMessageSubscription.message,
              ...data.getMessages,
            ],
          },
          variables: {
            roomId: route?.params?.roomId,
          },
        });

        // update message status

        if (
          messageSubscriptionData.getMessageSubscription.type === "CREATION"
        ) {
          messageUpdateStatusHandel({
            variables: {
              messageId:
                messageSubscriptionData.getMessageSubscription.message.id,
              type: "DELIVERED",
            },
          });
        }
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

  const updateUserLastOnlineTextHandel = () => {
    if (!lastOnline) {
      return "offline";
    }

    if (lastOnline && lastOnline < 5 * 60 * 1000) {
      return "online";
    } else {
      return `online ${moment(lastOnline).fromNow()}`;
    }
  };

  const activeUserId = activeUserData?.getUser?.id;
  const userInfo = userData?.getUser;
  const messages = messagesData?.getMessages;

  return (
    <>
      <TopUserInfo
        navigation={navigation}
        props={userInfo}
        isOnline={updateUserLastOnlineTextHandel()}
      />

      <SwipeListView
        style={{
          position: "relative",
          backgroundColor: "#fbfbfb",
          flex: 1,
        }}
        data={messages}
        renderItem={(item: any) => {
          return (
            <MessageCard
              props={item.item}
              activeUserId={activeUserId}
              messageUpdateStatusHandel={messageUpdateStatusHandel}
            />
          );
        }}
        inverted
        keyExtractor={(item: any) => item.id.toString()}
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
        renderHiddenItem={(rowData, rowMap) => {
          return (
            <View
              style={{
                height: "100%",
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 5,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f5f0f0",
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name={"undo-outline"}
                  width={25}
                  height={25}
                  fill={"#1ba7f8"}
                />
              </View>
            </View>
          );
        }}
        leftOpenValue={60}
        previewRowKey={"1"}
        previewOpenDelay={3000}
        disableLeftSwipe={true}
        showsVerticalScrollIndicator={false}
        onRowOpen={(rowKey, rowMap) => {
          setReplyMessageId(rowMap[+rowKey]?.props.item?.id);

          return rowMap[+rowKey].closeRow();
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: replyMessageId ? 150 : 60,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
          backgroundColor: "#ffffff",
          borderRadius: 20,
        }}
      >
        <AddMessageInput
          roomId={route?.params?.roomId}
          messageReplyId={replyMessageId}
          activeUserId={activeUserId}
          setReplyMessageId={setReplyMessageId}
        />
      </View>
    </>
  );
};
