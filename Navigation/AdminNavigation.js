import {createNativeStackNavigator} from '@react-navigation/native-stack'

import React from 'react';

import AdminManageFeedbackScreen from '../Screens/AdminManageFeedbackScreen'
import AdminManageHallRequest from '../Screens/AdminManageHallRequest'
import AdminUserManagementScreen from '../Screens/AdminUserManagementScreen'
import AdminPaymentFlowScreen from '../Screens/AdminPaymentFlowScreen';
import AdminDashboardScreen from '../Screens/AdminDashboardScreen';

function AdminNavigation(props) {
    const Stack=createNativeStackNavigator()
    return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Admin Dashboard' component={AdminDashboardScreen}/>
        <Stack.Screen name='Manage Feedback' component={AdminManageFeedbackScreen}/>
        <Stack.Screen name='Manage Halls' component={AdminManageHallRequest}/>
        <Stack.Screen  name='Manage Users' component={AdminUserManagementScreen}/>
        <Stack.Screen name='Manage Payments' component={AdminPaymentFlowScreen}/>
     </Stack.Navigator>
    );
}

export default AdminNavigation;