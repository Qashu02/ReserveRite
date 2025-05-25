import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import AppButton from '../components/AppButton';
import auth from '../api/auth';

function VerificationScreen({ route, navigation }) {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === otp.length) {
      try {
        await auth.verifyOTP(email, enteredOtp);

        Toast.show({
          type: 'success',
          text1: 'OTP Verified Successfully',
        });

        navigation.navigate('ConfirmPassword', {
          isReset: true,
          emailFromOTP: email,
          otpFromOTP: enteredOtp, // ✅ Fix: use correct variable here
        });
      } catch (error) {
        const message = error?.response?.data?.message || 'Invalid OTP, please try again.';
        Toast.show({
          type: 'error',
          text1: 'OTP Verification Failed',
          text2: message,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incomplete OTP',
        text2: 'Please enter the full OTP.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Enter the OTP sent to your Email</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            ref={(ref) => (inputs.current[index] = ref)}
            autoFocus={index === 0}
            returnKeyType="done"
          />
        ))}
      </View>
      <AppButton title="Submit" onPress={handleVerify} />
    </KeyboardAvoidingView>
  );
}

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    borderBottomWidth: 2,
    borderColor: '#333',
    width: 50,
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 8,
  },
});
