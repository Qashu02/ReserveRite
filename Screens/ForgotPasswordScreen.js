import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppErrorMessage from '../components/AppErrorMessage';

function ForgotPasswordScreen({ navigation }) {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required").email('Invalid Email'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log("Forgot password", values);
          navigation.navigate("ConfirmPassword");
        }}
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
