import {createNativeStackNavigator} from "@react-navigation/native-stack"

import { View, Text, Settings } from 'react-native'
import React from 'react'
import  BookingHistoryScreen from '../Screens/BookingHistoryScreen'

import EditProfileScreen from '../Screens/EditProfileScreen'
import SettingsScreen from "../Screens/SettingsScreen"
import ConfirmPasswordScreen from "../Screens/ConfirmPasswordScreen"
import SupportScreen from '../Screens/SupportScreen'
export default function SettingsStack() {
    const Stack =createNativeStackNavigator()
  return (
  <Stack.Navigator screenOptions={{headerShown:false}}>

   
    <Stack.Screen name="Settings" component={SettingsScreen}/>
    <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
    <Stack.Screen name="Change Password" component={ConfirmPasswordScreen} />
    <Stack.Screen name="Help Support" component={SupportScreen} />
   

    
  </Stack.Navigator>
  )
}