import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppErrorMessage from '../components/AppErrorMessage';
import auth from '../api/auth'; // 🔁 your centralized API file
import Toast from 'react-native-toast-message';

function ForgotPasswordScreen({ navigation }) {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required").email('Invalid Email'),
  });

  const handleForgotPassword = async (values) => {
  try {
    const response = await auth.forgotPassword(values.email);
    console.log("Response from forgotPassword:", response.data);

    if (response.data.message === "User not found") {
      // Show error toast if user not found
      Toast.show({
        type: 'error',
        text1: 'Email not found',
        text2: 'Please enter a registered email address.',
      });
      return;  // Stop further processing
    }

    // Otherwise assume OTP sent
    Toast.show({
      type: 'success',
      text1: 'OTP sent successfully',
    });

    navigation.navigate("Verification", { email: values.email });

  } catch (error) {
    console.error('API error:', error.response || error.message);

    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
      text2: error?.response?.data?.message || 'Please try again later.',
    });
  }
};




  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ValidationSchema}
        onSubmit={handleForgotPassword}
      >
        {({ values, touched, handleBlur, handleChange, errors, handleSubmit }) => (
          <View style={styles.content}>
            <Text style={styles.text}>Forgot Password</Text>

            <AppTextInput
              icon="email"
              placeholder="Enter your Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <AppErrorMessage error={errors.email} visible={touched.email} />

            <AppButton title="Submit" onPress={handleSubmit} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login}>Log in</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  content: {
    width: "100%",
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  login: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
});

export default ForgotPasswordScreen;
