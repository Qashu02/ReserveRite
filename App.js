import React from "react";
import { View, StyleSheet } from "react-native";
import AppNavigation from "./Navigation/AppNavigation";
import Toast from "react-native-toast-message";
import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { UserProvider } from "./Utils/userContext";
import NetworkStatus from "./components/NetworkStatus";
export default function App() {
  const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5', // Your desired background color
  },
};
  return (
      <UserProvider>
    <View style={styles.container}>

      <NavigationContainer theme={MyTheme}>
        <NetworkStatus/>
   <AppNavigation/>
      </NavigationContainer>
  
  

      <Toast />
  
   
    </View>
      </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
