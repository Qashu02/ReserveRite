import {createNativeStackNavigator} from "@react-navigation/native-stack"

import { View, Text, Settings } from 'react-native'
import React from 'react'
import  BookingHistoryScreen from '../Screens/BookingHistoryScreen'
import MessageScreen from "../Screens/MessageScreen";
import BookingTrackingScreen from "../Screens/BookingTrackingScreen";

import ProfileScreen from "../Screens/ProfileScreen";
import EditProfileScreen from '../Screens/EditProfileScreen'
import SettingsStack from './SettingsStack'
import ChatScreen from "../Screens/ChattScreen";
export default function ProfileStack() {
    const Stack =createNativeStackNavigator()
  return (
  <Stack.Navigator screenOptions={{headerShown:false}}>

   
    <Stack.Screen name="Profile" component={ProfileScreen}/>
    <Stack.Screen name="Booking History" component={BookingHistoryScreen} />
    <Stack.Screen name="Message" component={MessageScreen} />
    <Stack.Screen  name="Chatt" component={ChatScreen}/>
    <Stack.Screen name="Track Booking" component={BookingTrackingScreen} />
    <Stack.Screen name="SettingsPage" component={SettingsStack} />
    <Stack.Screen name="Edit Profile" component={EditProfileScreen}/>
    
  </Stack.Navigator>
  )
}