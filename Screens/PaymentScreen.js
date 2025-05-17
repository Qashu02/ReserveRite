import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import Screen from '../components/Screen';

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const handlePayment = () => {
    // Here you would normally integrate with Stripe or another payment gateway
    console.log('Payment Details:', { cardNumber, expiryDate, cvv, nameOnCard });
    // After payment, navigate or show success
    // navigation.navigate('PaymentSuccess'); // Example
  };

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      <Screen>

      <Text style={styles.title}>Payment Details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          value={nameOnCard}
          onChangeText={setNameOnCard}
          />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
          maxLength={19}
          />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={setExpiryDate}
            maxLength={5}
            />
        </View>

        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            keyboardType="number-pad"
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
            maxLength={4}
            />
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Ionicons name="card-outline" size={24} color="white" />
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
            </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#555',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payButton: {
    backgroundColor:colors.secondary,
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PaymentScreen;
