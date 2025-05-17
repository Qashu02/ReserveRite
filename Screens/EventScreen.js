import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
const sampleOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    date: '2025-04-20',
    time: '7 PM - 11 PM',
    status: 'Pending',
    price: 'PKR 20,000',
    services: ['Catering', 'Decoration'],
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    date: '2025-05-02',
    time: '5 PM - 10 PM',
    status: 'Done',
    price: 'PKR 30,000',
    services: ['Music', 'Lighting'],
  },
];

export default function EventScreen() {




  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.customerName}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{item.time}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{item.price}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Services:</Text>
        <Text style={styles.value}>{item.services.join(', ')}</Text>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusLabel}>Status:  </Text>
        <Text style={[styles.statusValue, { color: '#f39c12' }]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Events</Text>
      <FlatList
        data={sampleOrders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No pending events.</Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    width: 80,
    color: '#555',
  },
  value: {
    color: '#333',
  },
  statusRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statusLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  statusValue: {
    fontWeight: 'bold',
  },
});
