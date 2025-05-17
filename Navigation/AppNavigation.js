import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation'; // Import auth navigation
import TabNavigator from './ClientTabNavigation';   // Import your TabNavigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClientTabNavigation from './ClientTabNavigation';
import ManagerTabNavigation from './ManagerTabNavigation';
import HallProfileFormScreen from '../Screens/HallProfileFormScreen';

const AppNavigation = () => {

const Stack= createNativeStackNavigator()
  return (
 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Screen name="Client Tab" component={ClientTabNavigation} />
       <Stack.Screen name='Hall Profile Form' component={HallProfileFormScreen}/>
      <Stack.Screen name='Manager Tab' component={ManagerTabNavigation}/>
      </Stack.Navigator>
  
  );
};

export default AppNavigation;
