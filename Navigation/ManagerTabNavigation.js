import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HallManagerDashboard from '../Screens/HallManagerDashboard';
import MessageScreen from '../Screens/MessageScreen';
import EventScreen from '../Screens/EventScreen';
import HallProfileStack from './Hall Manager Stack/HallProfileStack'
import DashboardStack from './Hall Manager Stack/DashboardStack'
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

function ManagerTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'view-dashboard';
          } else if (route.name === 'Event') {
            iconName = 'calendar';
          } else if (route.name === ' Message') {
            iconName = 'message-text';
          } else if (route.name === 'Hall Profile Stack') {
            iconName = 'home-city';
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color={focused ? colors.secondary : 'gray'}
            />
          );
        },

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
      })}
      
      
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name=" Message" component={MessageScreen} />
      <Tab.Screen name="Hall Profile Stack" component={HallProfileStack} />
    </Tab.Navigator>
  );
}

export default ManagerTabNavigation;
