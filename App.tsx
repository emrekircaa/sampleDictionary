import React from "react";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bookmark from "./src/Screens/Bookmark";
import Search from "./src/Screens/Search";
import History from "./src/Screens/History";
import { Feather } from "@expo/vector-icons";
import { store } from "./src/redux";
import { Provider } from "react-redux";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Search"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;
              let iconSize: number;
              if (route.name === "Search") {
                iconName = focused ? "search" : "search";
                iconSize = focused ? 32 : size;
              } else if (route.name === "BookMark") {
                iconName = focused ? "bookmark" : "bookmark";
                iconSize = focused ? 32 : size;
              } else if (route.name === "History") {
                iconName = focused ? "clock" : "clock";
                iconSize = focused ? 32 : size;
              }
              return (
                <Feather name={iconName as any} size={iconSize} color={color} />
              );
            },
            tabBarStyle: {
              height: Platform.OS === "ios" ? 96 : 76,
            },
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {
              marginBottom: Platform.OS === "ios" ? 5 : 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarActiveTintColor: "#E32F48",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen name="BookMark" component={Bookmark} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
