import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MessageScreen from "../Screens/MessageScreen";
import ChatScreen from "../Screens/ChattScreen";
import React from "react";

export default function MessageStack() {
  const Stack = createNativeStackNavigator();

  return ( 
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Messages" component={MessageScreen} />
      <Stack.Screen name="Chatt" component={ChatScreen} />
    </Stack.Navigator>
  );
}
