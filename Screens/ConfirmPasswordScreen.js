import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import AppErrorMessage from '../components/AppErrorMessage';
import Toast from 'react-native-toast-message';
import updatePassword from '../api/updatePassword';
import { resetPassword } from '../api/auth';
import { UserContext } from '../Utils/userContext';

const ChangePasswordScreen = ({ navigation, route }) => {
  const { user, authToken, logout } = useContext(UserContext); // Add logout if available

  const { isReset = false, emailFromOTP, otpFromOTP } = route.params || {};

  console.log('ChangePasswordScreen route.params:', route.params);
  console.log('isReset:', isReset);

  const validationSchema = Yup.object().shape({
    ...( !isReset && {
      currentPassword: Yup.string().required('Current password is required'),
    }),
    newPassword: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your new password'),
  });

  const handleSubmit = async (values) => {
    try {
      if (isReset) {
        // Reset password flow
        if (!emailFromOTP || !otpFromOTP) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Email or OTP missing',
          });
          return;
        }

        // Add detailed logging to debug the API call
        console.log('=== Debug Reset Password ===');
        console.log('emailFromOTP:', emailFromOTP, 'type:', typeof emailFromOTP);
        console.log('newPassword:', values.newPassword, 'type:', typeof values.newPassword);
        console.log('otpFromOTP:', otpFromOTP, 'type:', typeof otpFromOTP);
        console.log('===============================');

        // Validate all parameters before API call
        if (!emailFromOTP || typeof emailFromOTP !== 'string') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid email parameter',
          });
          return;
        }

        if (!values.newPassword || typeof values.newPassword !== 'string') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid password parameter',
          });
          return;
        }

        if (!otpFromOTP || (typeof otpFromOTP !== 'string' && typeof otpFromOTP !== 'number')) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Invalid OTP parameter',
          });
          return;
        }

        // Convert OTP to string if it's a number
        const otpString = otpFromOTP.toString();

        console.log('Calling resetPassword with:', {
          email: emailFromOTP,
          password: '***',
          otp: otpString
        });

        const res = await resetPassword(emailFromOTP, values.newPassword, otpString);
        console.log('Reset password response:', res.data);
        console.log('Reset password response:', res.data);

        // Show success message with instruction
        Toast.show({
          type: 'success',
          text1: 'Password Reset Successful',
          text2: 'Please login with your new password',
          visibilityTime: 4000,
        });

        // Add a small delay to ensure backend processing is complete
        setTimeout(() => {
          // Clear any existing user session/tokens if applicable
          if (logout && typeof logout === 'function') {
            logout();
          }
          
          // Navigate to login with a flag to show password was reset
          navigation.navigate('Login', { 
            passwordReset: true,
            email: emailFromOTP 
          });
        }, 1500);

      } else {
        // Change password flow
        if (!authToken) {
          Toast.show({
            type: 'error',
            text1: 'Authentication Error',
            text2: 'User token is missing, please login again',
          });
          return;
        }

        console.log('Updating password for user:', user.id);
        const res = await updatePassword(user.id, values.currentPassword, values.newPassword, authToken);
        console.log('Update password response:', res.data);

        Toast.show({
          type: 'success',
          text1: 'Password Updated',
          text2: 'Your password has been changed successfully',
        });

        // For password change, user stays logged in
        navigation.goBack();
      }
    } catch (error) {
      console.error('Password update/reset error:', error);
      
      // More detailed error handling
      let errorMessage = 'Something went wrong';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Check for specific error types
      if (error.response?.status === 401) {
        errorMessage = 'Invalid current password or session expired';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid request. Please check your input.';
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found or invalid OTP';
      }

      Toast.show({
        type: 'error',
        text1: isReset ? 'Password Reset Failed' : 'Password Update Failed',
        text2: errorMessage,
        visibilityTime: 4000,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <Text style={styles.title}>
            {isReset ? 'Reset Password' : 'Change Password'}
          </Text>

          {!isReset && (
            <>
              <AppTextInput
                placeholder="Current Password"
                secureTextEntry
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                onBlur={handleBlur('currentPassword')}
              />
              <AppErrorMessage error={errors.currentPassword} visible={touched.currentPassword} />
            </>
          )}

          <AppTextInput
            placeholder="New Password"
            secureTextEntry
            value={values.newPassword}
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
          />
          <AppErrorMessage error={errors.newPassword} visible={touched.newPassword} />

          <AppTextInput
            placeholder="Confirm New Password"
            secureTextEntry
            value={values.confirmNewPassword}
            onChangeText={handleChange('confirmNewPassword')}
            onBlur={handleBlur('confirmNewPassword')}
          />
          <AppErrorMessage error={errors.confirmNewPassword} visible={touched.confirmNewPassword} />

          <AppButton 
            title={isReset ? 'Reset Password' : 'Update Password'} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ChangePasswordScreen;