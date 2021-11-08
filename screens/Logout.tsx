import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LogoutPage = ({ navigation }: any) => {
  React.useEffect(() => {
    (async () => {
      await AsyncStorage.removeItem("@auth_token");
    })();

    return navigation.navigate("LoginPage");
  }, []);

  return <></>;
};
