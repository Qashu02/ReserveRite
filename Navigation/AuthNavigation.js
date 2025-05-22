import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import ConfirmPasswordScreen from '../Screens/ConfirmPasswordScreen';
import UserSelectionScreen from '../Screens/UserSelectionScreen';
import React from 'react';
import VerificationScreen from '../Screens/VerificationScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name='Verification' component={VerificationScreen}/>
      <Stack.Screen name='ConfirmPassword' component={ConfirmPasswordScreen}/>
      <Stack.Screen name='User Selection' component={UserSelectionScreen}/>


    </Stack.Navigator>
  );
}
