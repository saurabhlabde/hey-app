import * as React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";
import { useMutation, useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

// component
import { SearchInput } from "../components/SearchInput";
import { UserCard } from "../components/UserCard";

// gql
import { USERS } from "../graphql/main/users";
import { SEARCH } from "../graphql/main/search";
import { CHECK_CHAT_ROOM } from "../graphql/main/checkRoomUser";
import { CREATE_CHAT_ROOM } from "../graphql/main/createRoom";

export const DiscoverPage = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [checkUserId, setCheckUserId] = React.useState<number | null>(null);

  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const [query] = useDebounce(searchQuery, 500);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(USERS);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = useQuery(SEARCH, {
    variables: {
      query: searchQuery,
    },
  });

  const {
    data: checkChatRoomData,
    loading: checkChatRoomLoading,
    error: checkChatRoomError,
    refetch: checkChatRoomRefetch,
  } = useQuery(CHECK_CHAT_ROOM, {
    variables: {
      userId: checkUserId,
    },
  });

  const [
    createChatRoomHandel,
    {
      data: createChatRoomData,
      loading: createChatRoomLoading,
      error: createChatRoomError,
    },
  ] = useMutation(CREATE_CHAT_ROOM);

  // loading
  React.useEffect(() => {
    const loading = usersLoading;

    setIsLoading(loading);
  }, [usersLoading]);

  // room
  React.useEffect(() => {
    if (checkChatRoomData) {
      const checkData = checkChatRoomData?.checkRoomUser;

      if (checkData?.isValid) {
        setCheckUserId(null);

        navigation.navigate("ChatRoomPage", {
          userId: checkData.userId,
          roomId: checkData.chatRoomId,
        });
      } else {
        createChatRoomHandel({
          variables: {
            userId: checkUserId,
          },
        });
      }
    }
  }, [checkChatRoomData]);

  // create room data
  React.useEffect(() => {
    if (createChatRoomData) {
      const createData = createChatRoomData?.createChatRoom;

      if (createData?.id) {
        setCheckUserId(null);

        navigation.navigate("ChatRoomPage", {
          userId: createData.userId,
          roomId: createData.chatRoomId,
        });
      }
    }
  }, [createChatRoomData]);

  // search
  React.useEffect(() => {
    if (query?.trim() !== "") {
      searchRefetch();
    }
  }, [query]);

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

  const createRoomHandel = (uid: number) => {
    if (uid) {
      setCheckUserId(uid);
      return checkChatRoomRefetch();
    }
  };

  const dataUsers =
    query.length >= 1 && searchData?.search?.length >= 1
      ? searchData.search
      : usersData?.getUsers;

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
          paddingTop: 50,
          height: "100%",
          width: "100%",
        }}
        data={dataUsers}
        renderItem={(item) => {
          return <UserCard props={item.item} clickHandel={createRoomHandel} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => {
          return <SearchInput value={searchQuery} setValue={setSearchQuery} />;
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
