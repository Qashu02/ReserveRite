import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Screen from '../components/Screen';
export default function BookingTrackingScreen() {
    const bookings = [
        {
          id: '1',
          hallName: 'Grand Royal Hall',
          date: '2025-04-20',
          status: 'Confirmed',
        },
        {
          id: '2',
          hallName: 'Elite Banquet',
          date: '2025-04-25',
          status: 'Pending',
        },
        {
          id: '3',
          hallName: 'Oceanview Ballroom',
          date: '2025-05-01',
          status: 'Cancelled',
        },
      ];

      const renderStatusIndicator =(status)=>{
        switch  (status){
            case 'Confirmed':
                return 'green';
              case 'Pending':
                return 'orange';
              case 'Cancelled':
                return 'red';
              default:
                return 'gray';
        }
  
      }
      const renderItem=({item})=>{
        return(

 <Card style={styles.card}>
    <View style={styles.row}>
        <View style={[styles.statusIndicator,{ backgroundColor: renderStatusIndicator(item.status)}]}/>
        <View>
            <Text style={styles.hallName}>{item.hallName}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.status}>status : {item.status}</Text>
        </View>
    </View>

 </Card>
        )
      }

  return (
    <Screen style={styles.container}>
        <Text style={styles.title}>Track your Booking</Text>
     <FlatList
     data={bookings}
     keyExtractor={(item)=>item.id}
     renderItem={renderItem}
     style={styles.list}
     />

    </Screen>
  )
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
  });
