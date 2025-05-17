import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import TopVector from '../components/Login/WeddingImage';
import colors from '../config/colors';
import { useRoute, useNavigation } from '@react-navigation/native';
import authApi from "../api/auth";
import Toast from 'react-native-toast-message';
import { getData, saveData, removeData } from "../Utils/storage";
import useApi from '../Hooks/useApi';

function UserSelectionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const formData = route.params?.formData;

  const registerApi = useApi(authApi.register);

  const handleRoleSelect = async (role) => {
    if (registerApi.loading) return; // Prevent multiple clicks

    try {
      // Call the API via useApi hook
      const response = await registerApi.request({ ...formData, role });

      if (!response.ok) {
        // Check if error is email already registered
        if (
          response.data?.message?.toLowerCase().includes('email already exist') ||
          response.data?.error?.toLowerCase().includes('email already exist')
        ) {
          Toast.show({
            type: 'error',
            text1: 'Email Already Registered',
            text2: 'Please try logging in instead',
          });
          navigation.navigate('Login');
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response.data?.message || 'Something went wrong',
        });
        return;
      }

      // Check stored user email AFTER successful registration to avoid premature deletion
      const existingUser = await getData('user');

      if (existingUser && existingUser.email !== formData.email) {
        await removeData('user');
        console.log("Cleared existing user to register new one");
      }

      // Save new user info
      await saveData('user', response.data.user);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account created successfully!',
      });

      // Navigate based on role
      await navigation.reset({
        index: 0,
        routes: [{ name: role === 'manager' ? 'Hall Profile Form' : 'Client Tab' }],
      });

    } catch (error) {
      console.error('Registration error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'An unexpected error occurred',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TopVector />
      <View style={styles.content}>
        <Text style={styles.text}>Who Are You?</Text>
        <AppButton
          title="Client"
          icon="arrow-right"
          onPress={() => handleRoleSelect('customer')}
          style={styles.button}
          disabled={registerApi.loading}
        />
        <AppButton
          title="Hall Manager"
          icon="arrow-right"
          onPress={() => handleRoleSelect('manager')}
          style={styles.button}
          disabled={registerApi.loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    width: '90%',
    marginTop: 100,
  },
  button: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default UserSelectionScreen;
