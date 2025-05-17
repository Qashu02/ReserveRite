import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Screen from '../components/Screen';
export default function AdminPaymentFlowScreen() {
  const [payments, setPayments] = useState([
    {
      id: '1',
      hallName: 'Grand Palace Hall',
      clientName: 'Ali Khan',
      clientEmail: 'alikhan@example.com',
      amount: '50000 PKR',
      status: 'Paid',
      date: '2025-04-25',
    },
    {
      id: '2',
      hallName: 'Sunset Gardens',
      clientName: 'Sara Ahmed',
      clientEmail: 'sara.ahmed@example.com',
      amount: '35000 PKR',
      status: 'Pending',
      date: '2025-04-24',
    },
    {
      id: '3',
      hallName: 'Royal Banquet',
      clientName: 'John Doe',
      clientEmail: 'john.doe@example.com',
      amount: '42000 PKR',
      status: 'Failed',
      date: '2025-04-23',
    },
  ]);

  const renderPayment = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.hallName}>Hall: {item.hallName}</Text>
      <Text style={styles.clientName}>Client: {item.clientName}</Text>
      <Text style={styles.clientEmail}>Email: {item.clientEmail}</Text>
      <Text style={styles.amount}>Amount: {item.amount}</Text>
      <Text style={[styles.status, item.status === 'Paid' ? styles.paid : item.status === 'Pending' ? styles.pending : styles.failed]}>
        Status: {item.status}
      </Text>
      <Text style={styles.date}>Date: {item.date}</Text>
    </View>
  );

  return (
    <Screen>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={renderPayment}
        contentContainerStyle={styles.container}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  hallName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  clientName: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
  },
  clientEmail: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 2,
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paid: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
  failed: {
    color: 'red',
  },
  date: {
    fontSize: 12,
    color: colors.medium,
  },
});
