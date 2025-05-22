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
console.log('formData:', formData);

  const registerApi = useApi(authApi.register);

  // Helper function to safely check for substrings in strings
  const includesIgnoreCase = (text, phrase) =>
    typeof text === 'string' && text.toLowerCase().includes(phrase.toLowerCase());
const handleRoleSelect = async (role) => {
  console.log('Role selected:', role);

  try {
    const response = await registerApi.request({ ...formData, role });
    console.log('API response:', response);

    if (!response.ok) {
      console.log('Registration failed:', response.data);
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: response.data?.message || 'Something went wrong',
      });
      return;
    }

    console.log('Registration success, navigating...');
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Account created successfully!',
    });

    navigation.reset({
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
