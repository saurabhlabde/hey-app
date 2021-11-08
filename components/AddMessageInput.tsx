import * as React from "react";
import { View, TextField } from "react-native-ui-lib";
import { StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Icon } from "react-native-eva-icons";
import { useMutation } from "@apollo/client";

// gql
import { CREATE_MESSAGE } from "../graphql/main/createMessage";

interface IAddMessageInput {
  roomId: number;
}

export const AddMessageInput: React.FC<IAddMessageInput> = ({ roomId }) => {
  const [text, setText] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [
    createMessageHandel,
    {
      data: createMessageData,
      loading: createMessageLoading,
      error: createMessageError,
    },
  ] = useMutation(CREATE_MESSAGE, {
    variables: {
      content: text,
      image: null,
      chatRoomId: roomId,
    },
  });

  // loading
  React.useEffect(() => {
    const loading = createMessageLoading;

    setIsLoading(loading);
  }, [createMessageLoading]);

  // add message data
  React.useEffect(() => {
    if (createMessageData) {
      setText("");
    }
  }, [createMessageData]);

  const addMessageHandel = () => {
    if (text?.trim() !== "") {
      return createMessageHandel();
    }
  };

  return (
    <View style={[styles.card, styles.cardMessageAdd]}>
      <View style={[styles.cardLeft, styles.card]}>
        <View style={[styles.buttonAddMedia]}>
          <Icon name={"plus-circle"} width={35} height={35} fill={"#3366FF"} />
        </View>

        <View style={[styles.card, styles.cardAddMessage]}>
          <TextField
            placeholder="Type something"
            style={[styles.inputAddMessage]}
            hideUnderline={true}
            value={text}
            onChangeText={setText}
          />
        </View>
      </View>

      <View style={[styles.cardRight]}>
        <TouchableOpacity activeOpacity={0.8} onPress={addMessageHandel}>
          <View style={[styles.buttonAdd]}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon
                name={"rewind-right"}
                width={30}
                height={30}
                fill={"#ffffff"}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },

  cardMessageAdd: {
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },

  cardLeft: {
    flex: 1,
    // backgroundColor: "#f3e7e7",
    borderRadius: 50,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    justifyContent: "space-between",
  },

  cardRight: {
    alignItems: "center",
    justifyContent: "center",
  },

  cardAddMessage: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 4,
  },

  inputAddMessage: {
    fontSize: 17,
    fontWeight: "500",
  },

  buttonAddMedia: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonAdd: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0044ff",
    overflow: "hidden",
    marginRight: 5,
  },
});
