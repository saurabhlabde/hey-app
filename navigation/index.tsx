import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { ActivityIndicator, ColorSchemeName } from "react-native";
import { Icon } from "react-native-eva-icons";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

import LinkingConfiguration from "./LinkingConfiguration";

// screen
import { RegisterPage } from "../screens/Register";
import { LoginPage } from "../screens/Login";
import { MessagePage } from "../screens/Message";
import { ChatRoomPage } from "../screens/ChatRoom";
import { NotificationPage } from "../screens/Notification";
import { LogoutPage } from "../screens/Logout";
import { ProfilePage } from "../screens/Profile";
import { DiscoverPage } from "../screens/Discover";

// gql
import { TOKEN_CHECK } from "../graphql/auth/tokenCheck";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [auth, setAuth] = React.useState<boolean>(false);

  const {
    data: tokenCheckData,
    loading: tokenCheckLoading,
    error: tokenCheckError,
  } = useQuery(TOKEN_CHECK);

  React.useEffect(() => {
    setIsLoading(tokenCheckLoading);
  }, [tokenCheckLoading]);

  React.useEffect(() => {
    if (tokenCheckData?.tokenCheck) {
      setAuth(true);
    }
  }, [tokenCheckData]);

  if (isLoading) {
    <ActivityIndicator color="blue" size="large" />;
  }

  const initialPage = !isLoading ? (auth ? "Home" : "LoginPage") : null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={`${initialPage}`}
    >
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
        <Stack.Screen name="Home" component={MessagePage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const iconSize = 28;
  const iconColor = "#3366FF";

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={MessagePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Notification"
        component={NotificationPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "bell" : "bell-outline"}
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Discover"
        component={DiscoverPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "compass" : "compass-outline"}
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="Logout"
        component={LogoutPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name={focused ? "log-out" : "log-out-outline"}
              width={iconSize}
              height={iconSize}
              fill={iconColor}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
