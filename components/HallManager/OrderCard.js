import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const statusColors = {
  Pending: '#f0ad4e',
  Accepted: '#5cb85c',
  Rejected: '#d9534f',
  Completed: '#5bc0de',
};

export default function OrderCard({ order, onStatusChange }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{order.customerName}</Text>
      <Text>Date: {order.date}</Text>
      <Text>Time: {order.time}</Text>
      <Text>Services: {order.services.join(', ')}</Text>
      <Text>Price: {order.price}</Text>
      <Text style={[styles.status, { color: statusColors[order.status] }]}>
        Status: {order.status}
      </Text>

      {/* Status Action Buttons */}
      {order.status === 'Pending' && (
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onStatusChange(order.id, 'Accepted')}
            style={[styles.btn, { backgroundColor: '#5cb85c' }]}
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onStatusChange(order.id, 'Rejected')}
            style={[styles.btn, { backgroundColor: '#d9534f' }]}
          >
            <Text style={styles.btnText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
