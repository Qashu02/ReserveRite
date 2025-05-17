import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native'
import React from 'react'
import { StackRouter } from "@react-navigation/native";
import HallManagerDashboard from '../../Screens/HallManagerDashboard'

import ManageAvailabilityScreen from "../../Screens/ManageAvailabilityScreen";
import EventScreen from "../../Screens/EventScreen";
import SettingsScreen from "../../Screens/SettingsScreen";
import SettingsStack from "../SettingsStack";
import HallProfileFormScreen from "../../Screens/HallProfileFormScreen";
import ReviewScreen from "../../Screens/ReviewScreen";

export default function ManagerNavigation() {
    const Stack=createNativeStackNavigator()
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Hall Manager Dashboard" component={HallManagerDashboard}/>
    <Stack.Screen name="Event" component={EventScreen}/>
    <Stack.Screen name="Manage Availability" component={ManageAvailabilityScreen}/>
    <Stack.Screen name="Reviews" component={ReviewScreen} initialParams={{isHallManager:true}}/>
    <Stack.Screen name="Edit Profile" component={HallProfileFormScreen} initialParams={{editMode : true}} />


   </Stack.Navigator>
  )
}