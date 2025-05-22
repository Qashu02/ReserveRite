import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppErrorMessage from '../components/AppErrorMessage';
import Toast from 'react-native-toast-message';
import auth from '../api/auth';

function ConfirmPasswordScreen({ route, navigation }) {
  const { email } = route.params;  // Get email from navigation param

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleResetPassword = async (values) => {
    try {
      // Call reset password API with email and new password
      await auth.resetPassword(email, values.password);

      Toast.show({
        type: 'success',
        text1: 'Password changed successfully',
      });

      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.message || 'Could not reset password',
      });
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ password: '', confirmPassword: '' }}
      onSubmit={handleResetPassword}
    >
      {({ touched, errors, handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.text}>Choose New Password</Text>

          <AppTextInput
            placeholder="Enter Password"
            iconPress="eye"
            secureTextEntry={!showPassword}
            onIconPress={() => setShowPassword((prev) => !prev)}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.field}
          />
          <AppErrorMessage error={errors.password} visible={touched.password} />

          <AppTextInput
            placeholder="Confirm Password"
            iconPress="eye"
            secureTextEntry={!showConfirmPassword}
            onIconPress={() => setShowConfirmPassword((prev) => !prev)}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            style={styles.field}
          />
          <AppErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />

          <AppButton title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    justifyContent: 'space-between',
  }
});

export default ConfirmPasswordScreen;
