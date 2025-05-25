import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import colors from '../config/colors';
import Screen from '../components/Screen';
import useApi from '../Hooks/useApi';
import supportApi from '../api/support'; // your API client for support
import { UserContext } from '../Utils/userContext'; // Adjust path to your context file

export default function SupportScreen() {
  const { user , authToken} = useContext(UserContext); // get user from context (assuming it contains token)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Pass the token when calling API request
  const createSupportRequestApi = useApi(supportApi.createSupportRequest);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all the fields.',
      });
      return;
    }

    const requestData = { name, email, subject, message };

    // Pass token to API call, assuming supportApi.createSupportRequest supports it
    const response = await createSupportRequestApi.request(requestData, authToken);

    console.log(response);
    if (!createSupportRequestApi.error) {
      Toast.show({
        type: 'success',
        text1: 'Support Request Sent',
        text2: 'We will get back to you shortly.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send support request. Please try again.',
      });
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.subtitle}>Feel free to contact our support team anytime.</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          keyboardType="email-address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#999"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.messageBox]}
          placeholder="Describe your issue..."
          multiline
          numberOfLines={5}
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={createSupportRequestApi.loading}
        >
          <Text style={styles.buttonText}>
            {createSupportRequestApi.loading ? 'Sending...' : 'Submit Request'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 24,
  },
  label: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 14,
    color: colors.dark,
  },
  messageBox: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
