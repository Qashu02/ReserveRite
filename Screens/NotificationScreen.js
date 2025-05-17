import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import Screen from '../components/Screen';
export default function NotificationScreen() {
  // Sample notifications data
  const [notifications, setNotifications] = useState([

    {
      id: '2',
      title: 'Order Update',
      message: 'Your booking for Jane Smith has been accepted.',
      time: '1 day ago',
    },
 
    {
      id: '4',
      title: 'Order Confirmed',
      message: 'Your Reservation is set',
      time: '3 days ago',
    },
    
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationCard} onPress={() => alert(item.title)}>
      <View style={styles.iconContainer}>
        <Ionicons name="notifications-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications available.</Text>}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  
  },
  header: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.text,
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text,
    marginTop: 50,
    fontSize: 16,
  },
});
