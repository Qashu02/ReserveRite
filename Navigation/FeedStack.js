import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import React from 'react'
import NotificationScreen from '../Screens/NotificationScreen'
import FilterScreen from "../Screens/FilterScreen";
import MenuDetailsScreen from '../Screens/MenuDetailsScreen'
import HallListScreen from "../Screens/HallListScreen";
import Card from "../components/Blog/Card";
import PaymentScreen from "../Screens/PaymentScreen";
import ChatScreen from "../Screens/ChattScreen";
export default function FeedStack() {
    const Stack =createNativeStackNavigator()
  return (
  <Stack.Navigator screenOptions={{headerShown:false}}>

    <Stack.Screen name="Hall List" component={HallListScreen}
options={{
  
  headerShown:false
}} />
    
    <Stack.Screen name="Notification" component={NotificationScreen} />
    <Stack.Screen name="Filter" component={FilterScreen} />
    <Stack.Screen name="Card" component={Card} />
    <Stack.Screen  name="Chatt" component={ChatScreen}/>
    <Stack.Screen name="Menu Details" component={MenuDetailsScreen} />
    <Stack.Screen name="Payment Details" component={PaymentScreen} />
    
  </Stack.Navigator>
  )
}