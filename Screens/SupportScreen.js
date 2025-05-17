import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import colors from '../config/colors';

export default function SupportScreen() {
  const handleSubmit = () => {
    Alert.alert('Support Request Sent', 'We will get back to you shortly.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.subtitle}>Feel free to contact our support team anytime.</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#999" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="you@example.com" keyboardType="email-address" placeholderTextColor="#999" />

      <Text style={styles.label}>Subject</Text>
      <TextInput style={styles.input} placeholder="Subject" placeholderTextColor="#999" />

      <Text style={styles.label}>Message</Text>
      <TextInput
        style={[styles.input, styles.messageBox]}
        placeholder="Describe your issue..."
        multiline
        numberOfLines={5}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
