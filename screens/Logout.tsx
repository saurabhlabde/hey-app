import * as React from "react";

export const LogoutPage = ({ navigation }: any) => {
  React.useEffect(() => {
    return navigation.navigate("LoginPage");
  }, []);

  return <></>;
};
