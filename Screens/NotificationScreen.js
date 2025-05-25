import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import Screen from '../components/Screen';
import notificationApi from '../api/notification';
import { getData } from '../Utils/storage';
import Toast from 'react-native-toast-message';

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications with token
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = await getData('authToken');
      if (!token) throw new Error('No auth token');

      const response = await notificationApi.getNotifications(token);

      if (response.ok) {
        setNotifications(response.data);
      } else {
        console.error('API response error:', response);
        Toast.show({ type: 'error', text1: 'Failed to load notifications' });
      }
    } catch (error) {
      console.error('Fetch notifications error:', error);
      Toast.show({ type: 'error', text1: 'Network error while loading notifications' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // MARK AS READ FUNCTION
  const markAsRead = async (notificationId) => {
    try {
      const token = await getData('authToken');
      const response = await notificationApi.markAsRead(notificationId, token);

      if (response.ok) {
        // Update the notification list in state to mark notification as read
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notificationId ? { ...n, read: true } : n
          )
        );
        Toast.show({ type: 'success', text1: 'Notification marked as read' });
      } else {
        console.error('Mark as read failed:', response);
        Toast.show({ type: 'error', text1: 'Failed to mark as read' });
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Toast.show({ type: 'error', text1: 'Error marking as read' });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.read && styles.readNotification]}
      onPress={() =>
        Alert.alert(
          item.title,
          item.message,
          [
            {
              text: item.read ? 'Already Read' : 'Mark as Read',
              onPress: () => !item.read && markAsRead(item._id),
              style: item.read ? 'cancel' : 'default',
            },
            { text: 'Close', style: 'cancel' },
          ],
          { cancelable: true }
        )
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={item.read ? 'notifications-off-outline' : 'notifications-outline'}
          size={24}
          color={item.read ? '#888' : colors.primary}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Screen style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications available.</Text>
        }
      />
      <Toast />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 10 },
  header: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: { paddingBottom: 20 },
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
  readNotification: {
    backgroundColor: '#f0f0f0',
  },
  iconContainer: { marginRight: 12, justifyContent: 'center' },
  textContainer: { flex: 1 },
  title: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: { fontSize: 14, color: colors.text },
  time: { marginTop: 6, fontSize: 12, color: '#888' },
  emptyText: {
    textAlign: 'center',
    color: colors.text,
    marginTop: 50,
    fontSize: 16,
  },
});
