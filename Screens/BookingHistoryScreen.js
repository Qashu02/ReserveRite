import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
const bookingHistory = [
  {
    id: '1',
    hallName: 'Grand Imperial Hall',
    date: '2025-04-01',
    pricePerHead: 800,
    guests: 120,
    status: 'Confirmed',
  },
  {
    id: '2',
    hallName: 'Royal Palace Banquet',
    date: '2025-03-15',
    pricePerHead: 950,
    guests: 90,
    status: 'Cancelled',
  },
  {
    id: '3',
    hallName: 'Classic Venue Hall',
    date: '2025-02-10',
    pricePerHead: 700,
    guests: 150,
    status: 'Completed',
  },
];

export default function BookingHistoryScreen() {
const renderItem = ({item}) => {
  const totalCost=item.pricePerHead*item.guests;
  return(

  <View style={styles.card}>
    <Text style={styles.hallName}>{item.hallName}</Text>
    <View style={styles.details}>

<Text  >Date:{item.date}</Text>
<Text >Guests: {item.guests}</Text>
<Text>Price Per Head: Rs {item.pricePerHead}</Text>
<Text>Total Cost: Rs {totalCost}</Text>
    </View>
    <Text style={[styles.status,getStatusStyle
    (item.status
      )
    ]}>{item.status}</Text>
  </View>
  )
}

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return { color: 'green' };
      case 'Cancelled':
        return { color: 'red' };
      case 'Completed':
        return { color: 'blue' };
      default:
        return { color: '#555' };
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.heading}>Booking History</Text>
      <FlatList
        data={bookingHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  
  
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 8,
  },
  hallName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  status: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
  },
});