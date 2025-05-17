import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

export default function AdminUserManagementScreen() {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Ali Khan',
      email: 'ali.khan@example.com',
      phone: '+923001234567',
      status: 'Active',
      role: 'customer',
      registrationDate: '2025-01-15',
    },
    {
      id: '2',
      name: 'Sara Ahmed',
      email: 'sara.ahmed@example.com',
      phone: '+923004567890',
      status: 'Blocked',
      role: 'manager',
      registrationDate: '2025-02-10',
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+923008765432',
      status: 'Active',
      role: 'manager',
      registrationDate: '2025-03-05',
    },
  ]);

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Active' ? 'Blocked' : 'Active' }
          : user
      )
    );
  };

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
      <Text style={styles.date}>Joined: {item.registrationDate}</Text>

      <Text style={[styles.status, item.status === 'Active' ? styles.active : styles.blocked]}>
        Status: {item.status}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: item.status === 'Active' ? 'red' : 'green' },
        ]}
        onPress={() => handleToggleStatus(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.status === 'Active' ? 'Block User' : 'Unblock User'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
     

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  role: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.secondary,
    marginTop: 2,
  },
  email: {
    fontSize: 14,
    color: colors.medium,
    marginTop: 4,
  },
  phone: {
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: colors.medium,
    marginTop: 5,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  active: {
    color: 'green',
  },
  blocked: {
    color: 'red',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
