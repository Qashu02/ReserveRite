import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import Screen from '../components/Screen';
import { UserContext } from '../Utils/userContext';
import bookingApi from '../api/booking';
import { useNavigation } from '@react-navigation/native';

export default function BookingTrackingScreen() {
  const { user, authToken } = useContext(UserContext);
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !authToken) {
      console.log('User or authToken missing:', user, authToken);
      navigation.navigate('Login');
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await bookingApi.getMyBookings(authToken);
        console.log(response);
        if (response.ok) {
          setBookings(response.data);
        } else {
          setError('Failed to fetch bookings');
        }
      } catch (e) {
        setError('Failed to fetch bookings');
      }
      setLoading(false);
    };

    fetchBookings();
  }, [user, authToken]);

  const renderStatusIndicator = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'orange';
      case 'cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.statusIndicator, { backgroundColor: renderStatusIndicator(item.status) }]} />
        <View>
          <Text style={styles.hallName}>{item.hallName || 'Hall Name N/A'}</Text>
          <Text style={styles.status}>Status: {item.status}</Text>
          <Text style={styles.date}>{item.timeSlot}</Text>
          <Text style={styles.date}>Guests:{item.totalGuests}</Text>
        </View>
      </View>
    </Card>
  );

  if (loading) {
    return (
      <Screen style={styles.container}>
        <ActivityIndicator size="large" />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </Screen>
    );
  }

  if (bookings.length === 0) {
    return (
      <Screen style={styles.container}>
        <Text>No bookings found.</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Track your Booking</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item, index) => (item._id ? item._id.toString() : index.toString())}
        renderItem={renderItem}
        style={styles.list}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  hallName: {
    fontSize: 18,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
