import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

// Screens
import FeedStack from "./FeedStack";
import MessagesScreen from "../Screens/MessageScreen";
import BookingTrackingScreen from "../Screens/BookingTrackingScreen";
import ProfileStack from "./ProfileStack";
import MessageStack from "./MessageStack";
const Tab = createBottomTabNavigator();

const ClientTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          // backgroundColor: "#fff",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
          borderTopWidth: 4,
          borderColor: colors.secondary,
          // elevation: 10, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-text" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="TrackBooking"
        component={BookingTrackingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-path" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile User"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ClientTabNavigation;
