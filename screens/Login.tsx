import * as React from "react";
import { Text, TouchableOpacity, View, Toast } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { StyleSheet } from "react-native";

// component
import { Input } from "../components/Input";
import { Btn } from "../components/Button";

// gql
import { LOGIN } from "../graphql/auth/login";

// libs
import { setToken } from "../libs/setToken";

export const LoginPage = ({ navigation }: any) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [messageError, setMessageError] = React.useState<string>("");
  const [showToast, setShowToast] = React.useState<boolean>(false);

  const [onLogin, { data, loading, error }] = useMutation(LOGIN, {
    variables: {
      email,
      password,
    },
  });

  React.useEffect(() => {
    if (error) {
      const errorMessage: any = error?.graphQLErrors[0]?.extensions?.messages;

      if (errorMessage?.length >= 1) {
        errorMessage?.map((message: any) => {
          if (message?.message?.toLocaleLowerCase()?.includes("email")) {
            setMessageError("invalid input value");
            setShowToast(true);
          }

          if (message?.message?.toLocaleLowerCase()?.includes("password")) {
            setMessageError("invalid input value");
            setShowToast(true);
          }
        });
      }
    }
  }, [error]);

  React.useEffect(() => {
    if (data) {
      (async (d) => {
        const res: boolean = await setToken(d.login.token);

        if (res) {
          return navigation.navigate("Home");
        }
      })(data);
    }
  }, [data]);

  const loginHandel = () => {
    onLogin();
  };

  const dismissBottomToast = () => {
    return setShowToast(false);
  };

  return (
    <SafeAreaView style={[styles.page]}>
      <View style={styles.top}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Login</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.input}>
          <Input placeholder="Email id" value={email} setValue={setEmail} />

          <Input
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
        </View>

        <View style={styles.buttonRedirect}>
          <View style={styles.button}>
            <Btn title="Login" onPress={loginHandel} />
          </View>
        </View>

        <View style={styles.redirect}>
          <Text style={styles.redirectText}>Create an account?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              return navigation.navigate("RegisterPage");
            }}
          >
            <Text style={styles.redirectHighlightText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast
        visible={showToast}
        position={"bottom"}
        backgroundColor={"red"}
        message={`${messageError}`}
        onDismiss={dismissBottomToast}
        autoDismiss={5000}
        showDismiss={true}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  page: {
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },

  top: {},

  bottom: {
    marginTop: 30,
  },

  buttonRedirect: {
    marginTop: 50,
  },

  heading: {},

  input: {},

  button: {},

  redirect: {
    justifyContent: "center",
    marginTop: 30,
    flexDirection: "row",
  },

  headingText: {
    fontSize: 35,
  },

  redirectText: {
    fontSize: 15,
    color: "#000000",
  },

  redirectHighlightText: {
    fontSize: 15,
    color: "orange",
    marginLeft: 5,
  },
});
