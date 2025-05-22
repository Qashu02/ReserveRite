import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import AuthApi from '../api/auth';
import { saveData } from '../Utils/storage';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as Yup from 'yup';

import WeddingImage from '../components/Login/WeddingImage';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppErrorMessage from '../components/AppErrorMessage';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    if (loading) return;
    setLoading(true);
  ;


    try {
   const response = await AuthApi.login(values);
console.log('Full login response:', response.data);


      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.data?.message || 'Invalid email or password',
        });
        setLoading(false);
        return;
      }

      const { name, email, role } = response.data.user; // Ensure user is returned

      console.log('User Data to be stored:', { name, email, role });
      await saveData('user', { name, email, role });

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      // Slight delay to allow toast to show
      setTimeout(() => {
        const targetScreen = role === 'manager' ? 'Manager Tab' : 'Client Tab';
        navigation.reset({
          index: 0,
          routes: [{ name: targetScreen }],
        });
      }, 500);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Unexpected error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <WeddingImage style={styles.wedding} source={require('../assets/logo-secondary.png')} width={150} />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text style={styles.heading}>Sign In</Text>

              <AppTextInput
                icon="email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
              />
              <AppErrorMessage error={errors.email} visible={touched.email} />

              <AppTextInput
                icon="lock"
                placeholder="Enter your password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <AppErrorMessage error={errors.password} visible={touched.password} />

              {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginVertical: 10 }} />
              ) : (
                <AppButton title="Log in" onPress={handleSubmit} />
              )}
            </>
          )}
        </Formik>

        <TouchableOpacity style={styles.forgotContainer} onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <AppButton
          style={styles.createBtn}
          color="white"
          title="Create New Account"
          onPress={() => navigation.navigate('Registration')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#333',
  },
  forgotContainer: {
    marginVertical: 10,
  },
  forgotText: {
    color: '#555',
    textAlign: 'center',
  },
  createBtn: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  wedding: {
    paddingTop: 20,
    alignSelf: 'center',
  },
});

export default LoginScreen;
