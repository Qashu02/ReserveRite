import React from "react";
import { View, StyleSheet } from "react-native";
import AppNavigation from "./Navigation/AppNavigation";
import Toast from "react-native-toast-message";
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import MessageScreen from "./Screens/MessageScreen";
import MessageStack from "./Navigation/MessageStack";
import LocationExample from "./components/LocationExample";
import HallProfileScreen from "./Screens/HallProfileScreen";
import HallListScreen from "./Screens/HallListScreen";
import FeedStack from "./Navigation/FeedStack";
import BookingHistoryScreen from "./Screens/BookingHistoryScreen";
import SupportScreen from "./Screens/SupportScreen";
import ForgotPasswordScreen from "./Screens/ForgotPasswordScreen";
import AuthNavigation from "./Navigation/AuthNavigation";
export default function App() {
  const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5', // Your desired background color
  },
};
  return (
    <View style={styles.container}>
      <NavigationContainer theme={MyTheme}>
       <AppNavigation/>
      </NavigationContainer>
      <Toast />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
